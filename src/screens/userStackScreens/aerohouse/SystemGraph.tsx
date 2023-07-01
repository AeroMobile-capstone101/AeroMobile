import { View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Style from "../../../styles/GlobalStyle"
import { db } from '../../../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Ionicons } from "@expo/vector-icons"
import { DataPoint, animatedData, originalData } from '../../../assets/Data';
import { curveBasis, line, scaleLinear, scaleTime } from 'd3'
import Colors from '../../../styles/Colors';
import {Canvas, Path, Skia, SkPath} from "@shopify/react-native-skia";

interface summaryFormat {
    summary: [],
    loading: boolean,
    error: any
}

interface GraphData {
    min: number;
    max: number;
    curve: SkPath
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
                        : <RenderDataGraph data={summaryData.summary} />

                }

            </View>
    )
}

export default SystemGraph

const RenderDataGraph = (props: any) => {

    // Graph
    const GRAPH_HEIGHT = 100;
    const GRAPH_WIDTH = window_width - 100;

    const makeGraph = (data: DataPoint[]): GraphData => {

        const min = Math.min(...data.map(val => val.value)); // getting the minimum value
        const max = Math.max(...data.map(val => val.value)); // getting the maximum value

        const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 0]);
        const x = scaleTime()
            .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
            .range([0, GRAPH_WIDTH - 20]);
            
        console.log('x ====> ', x);
        console.log('y ====> ', y);
        

        const curvedLine = line<DataPoint>()
            .x((d) => x(new Date(d.date)))
            .y((d) => y(d.value))
            .curve(curveBasis)(data);

        const skPath = Skia.Path.MakeFromSVGString(curvedLine!)

        return {
            min,
            max,
            curve: skPath!,
        }

    };

    const tempGraph = makeGraph(originalData);
    const humidGraph = makeGraph(animatedData);

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

                {/* Temperature Graph */}
                <View style={[customStyle.graphContainer, { backgroundColor: 'lightblue' }]}>
                    <Text style={customStyle.graphTitle}>Temperature</Text>
                    <Canvas
                        style={{
                            height: GRAPH_HEIGHT,
                            width: GRAPH_WIDTH,
                        }}
                    >
                        <Path style="stroke" path={tempGraph.curve} strokeWidth={3} color={Colors.White.color} />
                    </Canvas>

                    <Text style={{marginTop: 20}}>Temperature</Text>


                </View>


                {/* Humidity Graph */}
                <View style={[customStyle.graphContainer, { backgroundColor: 'coral' }]}>
                    <Text style={customStyle.graphTitle}>Humidity</Text>
                    <Canvas
                        style={{
                            height: GRAPH_HEIGHT,
                            width: GRAPH_WIDTH,
                        }}
                    >
                        <Path style="stroke" path={humidGraph.curve} strokeWidth={3} color={Colors.White.color} />
                    </Canvas>

                </View>

                {/* Humidity Graph */}
                <View style={[customStyle.graphContainer, { backgroundColor: 'coral' }]}>
                    <Text style={customStyle.graphTitle}>Humidity</Text>
                    <Canvas
                        style={{
                            height: GRAPH_HEIGHT,
                            width: GRAPH_WIDTH,
                        }}
                    >
                        <Path style="stroke" path={humidGraph.curve} strokeWidth={3} color={Colors.White.color} />
                    </Canvas>

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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    overScrollMode='never'
                    contentContainerStyle={{
                        paddingVertical: 15
                    }}
                >
                    {
                        props.data.map((value: any, index: number) => (
                            <View
                                key={index}
                                style={{
                                    marginHorizontal: 10,
                                    marginVertical: 5,
                                    paddingHorizontal: 20,
                                    paddingVertical: 20,
                                    borderWidth: 1,
                                    borderColor: Colors.Black.color,
                                    borderRadius: 15
                                }}
                            >

                                <Text style={{ fontFamily: 'font-md' }}  >{value.created_at}</Text>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginVertical: 10
                                    }}
                                >
                                    <View>
                                        <Text>Humidity</Text>
                                    </View>
                                    <View>
                                        <Text>Temperature</Text>
                                    </View>
                                    <View>
                                        <Text>Acidity</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    }

                </ScrollView>

            </View>
        </View>
    )
}

const customStyle = StyleSheet.create({
    graphContainer: {
        width: window_width - 20,
        padding: 30,
        borderRadius: 25,
        marginLeft: 1,
        marginRight: 10
    },
    graphTitle: {
        fontFamily: 'font-md',
        fontSize: 16
    }
})