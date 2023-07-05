
import { View, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { curveBasis, line, scaleLinear, scaleTime, scalePoint } from 'd3'
import { Canvas, Line, Path, Skia, SkPath, Text, useFont, vec } from "@shopify/react-native-skia";
import Colors from '../../styles/Colors';

const { height: window_height, width: window_width } = Dimensions.get('window'); // screen width and height

interface GraphData {
  min: number,
  max: number,
  curve: SkPath
}

type DataPoint = {
  date: string;
  value: number;
  label: string
};

const TempGraph = (props: any) => {
   
  const font = useFont(require('../../assets/fonts/Outfit/Outfit-Regular.ttf'), 10);

  const CANVAS_WIDTH = window_width - 80;
  const CANVAS_HEIGHT = 150;

  const GRAPH_MARGIN = 20;

  const GRAPH_HEIGHT = CANVAS_HEIGHT - 2 * GRAPH_MARGIN ;
  const GRAPH_WIDTH = CANVAS_WIDTH;

  //creating points in x axis
  const xDomain = props.dataGraph.map((dataPoint: DataPoint) => dataPoint.label);
  const xRange = [2, GRAPH_WIDTH];
  const xPoints = scalePoint().domain(xDomain).range(xRange).padding(1); // a function to write points


  const makeGraph = (data: DataPoint[]): GraphData => {
    const min = Math.min(...data.map(val => val.value)); // getting the minimum value
    const max = Math.max(...data.map(val => val.value)); // getting the maximum value

    const minDate = data[0].date; // getting the lowest date
    const maxDate = data[data.length - 1].date; // getting the maximum date

    console.log(maxDate);
    

    const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 0]);
    const x = scaleTime()
      .domain([new Date(minDate), new Date(maxDate)])
      .range([20, GRAPH_WIDTH]);

    const curvedLine = line<DataPoint>()
      .x((d) => x(new Date(d.date)))//
      .y((d) => y(d.value))
      .curve(curveBasis)(data);

    const skPath = Skia.Path.MakeFromSVGString(curvedLine!)
    return {
      min,
      max,
      curve: skPath!,
    }
  };

  const graph = makeGraph(props.dataGraph);

  if (!font) {
    return <View />
  }

  return (
   
      <Canvas
        style={{
          height: CANVAS_HEIGHT,
          width: CANVAS_WIDTH,
        }}
      >
        <Line
          p1={vec(20, GRAPH_HEIGHT)}
          p2={vec(GRAPH_WIDTH, GRAPH_HEIGHT)}
          color={Colors.Black.color}
          style="stroke"
          strokeWidth={1}
        />
        <Text
          x={0}
          y={GRAPH_HEIGHT + 3}
          text={"0%"}
          font={font}
        />
        <Line
          p1={vec(20, GRAPH_HEIGHT * 0.5)}
          p2={vec(GRAPH_WIDTH, GRAPH_HEIGHT * 0.5)}
          color={Colors.Black.color}
          style="stroke"
          strokeWidth={1}
        />

        <Text
          x={0}
          y={GRAPH_HEIGHT * 0.525}
          text={"50%"}
          font={font}
        />

        <Line
          p1={vec(20, GRAPH_HEIGHT * 0.01)}
          p2={vec(GRAPH_WIDTH, GRAPH_HEIGHT * 0.01)}
          color={Colors.Black.color}
          style="stroke"
          strokeWidth={1}
        />

        <Text
          x={0}
          y={GRAPH_HEIGHT * 0.025}
          text={"100"}
          font={font}
        />

        <Path style="stroke" path={graph.curve} strokeWidth={3} color={Colors.Accent.color} />

        {props.dataGraph.map((dataPoint: DataPoint) => (
          <Text
            key={dataPoint.value}
            x={xPoints(dataPoint.label)}
            y={GRAPH_HEIGHT + 20}
            text={dataPoint.label}
            font={font}
          />
        )


        )}

      </Canvas>
  
  )

}

const style = StyleSheet.create({
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

export default TempGraph