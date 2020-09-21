import React, { useEffect, useState } from "react";
import "./SortingVisualizer.css";
import "./Slider";
import Slider from "./Slider";
const max = 200;
const min = 50;
export default function SortingVisualizerV2() {
  const [sortType, setSort] = useState("none");
  const [state, setState] = useState({
    array: [],
    compareIdx: [0, 0],
  });
  const [sliderValue, setSliderValue] = useState((max + min) / 2);
  useEffect(() => {
    resetArray(200);
  }, []);
  useEffect(
    function () {
      switch (sortType) {
        case "insertSort":
          insertSort();

          break;
        case "bubbleSort":
          bubbleSort();

          break;
        case "selectionSort":
          selectionSort();

        case "generating":
          resetArray(sliderValue);
          break;
      }
    },
    [sortType]
  );
  function renderHistory(history, timer) {
    var interval = 50;
    var len = history.length;
    for (let i = 0; i < len; i++) {
      setTimeout(() => {
        setState(history[i]);
        if (i == len - 1) {
          setSort("none");
        }
      }, (i + 1) * timer);
    }
  }
  function insertSort() {
    var array = [...state.array];
    var n = array.length;
    var history = [];
    history.push({ array: [...array], compareIdx: [0, 0] });
    for (var i = 0; i < n; i++) {
      var key = array[i];
      var j = i - 1;

      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j = j - 1;
        history.push({ array: [...array], compareIdx: [i, j] });
      }
      array[j + 1] = key;
    }
    renderHistory(history, 20);
  }

  function bubbleSort() {
    var array = [...state.array];
    var n = array.length;
    var history = [];
    history.push({ array: [...array], compareIdx: [0, 0] });
    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < n - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          var temporary = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temporary;
          history.push({ array: [...array], compareIdx: [i, j] });
        }
      }
    }
    renderHistory(history, 50);
  }
  function getSliderValue(event) {
    var value = event.target.value;
    setSliderValue(value);
    return resetArray(value);
  }

  function selectionSort() {
    var array = [...state.array];
    var history = [];
    history.push({ array: [...array], compareIdx: [0, 0] });
    var n = array.length;

    for (var i = 0; i < n - 1; i++) {
      var minIdx = i;
      for (var j = i + 1; j < n; j++) {
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }
      history.push({ array: [...array], compareIdx: [i, minIdx] });
      var temp = array[minIdx];
      array[minIdx] = array[i];
      array[i] = temp;
    }
    renderHistory(history, 50);
  }
  function resetArray(value) {
    const array = []; //mete array vazio
    for (var i = 0; i < value; i++) {
      array.push(randomIntFromInterval(5, 200));
    }
    setState({ array: array, n: 0, sort: "none" });
  }
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return (
    //texto html a ser renderizado
    <div className="Wrapper">
      <div className="array-container">
        <div className="array-bars-container">
          {state.array.map((
            value,
            idx //PERGUNTAR ARROW FUNCTION
          ) =>
            state.sort == "none" ? (
              <div
                className="array-bar"
                key={idx}
                style={{
                  //PERGUNTAR SE DA PARA FAZER DE OUTRA FORMA
                  backgroundColor: "white",
                  height: `${value}px`,
                }}
              ></div>
            ) : (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: state.compareIdx.includes(idx)
                    ? "red"
                    : "white",

                  height: `${value}px`,
                }}
              ></div>
            )
          )}
        </div>
      </div>
      <div className="buttonWrapper">
        <button
          className="generator"
          onClick={() =>
            setSort(function (oldState) {
              return oldState == "none" ? "generating" : oldState;
            })
          }
        >
          Gerar Novo Array
        </button>
        <Slider
          min={min}
          max={max}
          defaultValue={sliderValue}
          onInput={getSliderValue}
        ></Slider>
        <button
          className="generator"
          onClick={() => {
            setSort(function (oldState) {
              return oldState == "none" ? "insertSort" : oldState;
            });
          }}
        >
          InsertSort
        </button>
        <button
          className="generator"
          onClick={() => {
            setSort(function (oldState) {
              return oldState == "none" ? "bubbleSort" : oldState;
            });
          }}
        >
          BubbleSort
        </button>
        <button
          className="generator"
          onClick={() => {
            setSort(function (oldState) {
              return oldState == "none" ? "selectionSort" : oldState;
            });
          }}
        >
          SelectionSort
        </button>
      </div>
    </div>
  );
}
