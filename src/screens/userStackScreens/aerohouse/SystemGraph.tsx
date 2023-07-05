import { View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Style from "../../../styles/GlobalStyle"
import { db } from '../../../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Ionicons } from "@expo/vector-icons"
import Colors from '../../../styles/Colors';
import TempGraph from '../../../components/Charts/TempGraph';
import { originalData } from '../../../assets/Data';

interface summaryFormat {
    summary: [],
    loading: boolean,
    error: any
}

const { height: window_height, width: window_width } = Dimensions.get('window'); // screen width and height

const SystemGraph = (props: any) => {
    const { sysID, sysName } = props.route.params.data;
    const [summaryData, setSummaryData] = useState<summaryFormat>({
        summary: [],
        loading: true,
        error: ''
    });

    useEffect(() => {
        const systemRef = doc(db, 'system_collection', `${sysID}`);
        const getSystemSummary = onSnapshot(systemRef, (summarySnap) => {

            if (summarySnap.data()?.summary === undefined) {
                setSummaryData({
                    ...summaryData,
                    error: undefined,
                    loading: false
                })
                return
            }

            if (summarySnap.exists()) {
                setSummaryData({
                    summary: summarySnap.data()?.summary,
                    loading: false,
                    error: 'N/A'
                });

            } else {
                setSummaryData({
                    ...summaryData,
                    error: 'No Such Document!'
                })
            }
        })

        return () => getSystemSummary()
    }, [summaryData.loading])

    console.log(summaryData.summary);



    // transforming temperature data
    const tempData = summaryData.summary.map((data: any) => {
        const d = new Date(data.created_at);
        return (
            { date: d, value: data.temperature, label: '@' }
        )
    });
    // structuring humidity data
    const humidData = summaryData.summary.map((data: any) => ({ date: data.created_at, humidity: data.humidity }));
    // structuring acidity (pH) data
    const phData = summaryData.summary.map((data: any) => ({ date: data.created_at, acidity: data.acidity }));

    return (
        summaryData.loading
            ?
            <View style={Style.container}>
                <Text>Loading...</Text>
            </View>
            :

            <View>

                <View style={{
                    position: 'absolute',
                    top: 40,
                    left: 20,
                    zIndex: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>

                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                    >
                        <Ionicons name='arrow-back-circle-outline' size={32} color={Colors.Black.color} />
                    </TouchableOpacity>
                    <Text style={{
                        fontFamily: 'font-md',
                        fontSize: 24
                    }}> Data History </Text>
                </View>
                {
                    summaryData.error === undefined
                        ?
                        <View style={{}}>
                            <Text>{summaryData.error + ''}</Text>
                        </View>
                        : renderGraphs()
                }

            </View>
    )

    function renderGraphs() {
        const cardData = summaryData.summary.reverse();
        return (
            <View
                style={{
                    height: '100%',
                    width: '100%',
                }}
            >

                {/* GRAPH  */}
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    overScrollMode='never'
                    pagingEnabled={true}
                    snapToAlignment='center'
                    contentContainerStyle={{
                        paddingTop: 100,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 50,
                        backgroundColor: Colors.White.color,
                    }}
                >

                    <View style={[customStyle.graphContainer, { backgroundColor: "rgba(23,160,141, 0.25)" }]}>
                        <Text>Temperature</Text>
                        <TempGraph dataGraph={tempData} sample={tempData} />
                    </View>


                </ScrollView>

                {/* CARDS */}
                <View
                    style={{
                        backgroundColor: Colors.White.color,
                        height: '50%',
                        width: '100%',
                    }}
                >
                    {/* {
                        renderCards()
                    } */}

                    <FlatList
                        data={cardData}
                        renderItem={({ item }: any) => <RenderCards data={item}/>}
                        keyExtractor={(item: any) => item.created_at}
                        removeClippedSubviews={true}
                        initialNumToRender={10}
                    />

                </View>
            </View>
        )
    }

}

const RenderCards = (props: any) =>  {

    return (
        <View
            style={{
                marginHorizontal: 8,
                marginVertical: 8,
                paddingHorizontal: 24,
                paddingVertical: 16,
                borderWidth: 1,
                borderColor: Colors.Black.color,
                borderRadius: 30
            }}
        >
            <Text style={{ fontFamily: 'font-md' }}  >{props.data.created_at}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10
                }}
            >
                <View>
                    <Text>Humidity</Text>
                    <Text>{props.data.humidity}</Text>
                </View>
                <View>
                    <Text>Temperature</Text>
                    <Text>{props.data.temperature}</Text>
                </View>
                <View>
                    <Text>Acidity</Text>
                    <Text>{props.data.acidity}</Text>
                </View>
            </View>
        </View>
    )

}

export default SystemGraph


const customStyle = StyleSheet.create({
    graphContainer: {
        width: window_width - 20,
        padding: 32,
        borderRadius: 30,
        marginLeft: 1,
        marginRight: 10
    },
    graphTitle: {
        fontFamily: 'font-md',
        fontSize: 16
    }
})