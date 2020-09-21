import React, { useEffect, useState } from "react";
import "./SortingVisualizer.css";
import * as sorts from "./Sorts.js";

export default function SortingVisualizer() {
  //[[1,2,3,4],funçao para definir os valores ao array]
  //cria um hook(objecto) state que tem 3 objectos como atributo que tem atributos referentes ao estado
  const [state, setState] = useState({
    array: [],
    n: 1,
    sort: "none",
    compareIdx: [0, 0],
  });
  const max_size = 300;
  //use effect corre a função(e renderiza porque ha um setState) quando as variaveis dadas  do segundo parametro sao atualizadas caso nao tenha segundo parametro corre cada vez que o componente e atualizado se o segundo parametro for array vazio atualiza uyma vez na criação do componente
  useEffect(() => {
    resetArray();
  }, []);

  //vai correr sempre que o state atualiza e o state atualiza nos diferentes sorts usando os diferentes indices e arrays dados
  useEffect(
    function () {
      switch (state.sort) {
        case "insertSort":
          insertSwap(state.n, [...state.array]);
          break;
        case "bubbleSort":
          bubbleSort([...state.array], state.n);
          break;
      }
    },
    [state]
  );

  function resetArray() {
    const array = []; //mete array vazio
    array.push(730);
    for (let i = 1; i < 300; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    setState({ array: array, n: 0, sort: "none" });
  }
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function insertSwap(i, array) {
    var acabou = i == array.length ? true : false;
    if (!acabou) {
      let key = array[i];
      var j = i - 1;
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j = j - 1;
      }
      array[j + 1] = key;
    }
    setTimeout(function () {
      setState({
        array: array,
        n: acabou ? 0 : i + 1,
        sort: acabou ? "none" : "insertSort",
        compareIdx: [i, j],
      });
    }, 50);
  }
  function insertSort() {
    if (state.sort != "none") return;
    setState(function (oldState) {
      return { ...oldState, n: 1, sort: "insertSort", compareIdx: [0, 0] };
    });
  }

  function bubbleSort(array, j) {
    var acabou = j == 0 ? true : false;
    if (!acabou) {
      for (var i = 0; i < j - 1; i++)
        if (array[i] > array[i + 1]) {
          var key = array[i];
          array[i] = array[i + 1];
          array[i + 1] = key;
        }
    }
    setTimeout(function () {
      setState({
        array: array,
        n: acabou ? 0 : j - 1,
        sort: acabou ? "none" : "bubbleSort",
        compareIdx: [j, i],
      });
    });
  }

  function bubbleSorthelper() {
    if (state.sort != "none") return;

    setState(function (oldState) {
      return {
        ...oldState,
        n: oldState.array.length,
        sort: "bubbleSort",
        compareIdx: [0, 0],
      };
    });
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
      <div className="button wrapper">
        <button className="generator" onClick={() => resetArray()}>
          Gerar Novo Array
        </button>
        <button className="generator" onClick={() => insertSort()}>
          InsertSort
        </button>
        <button className="generator" onClick={() => bubbleSorthelper()}>
          BubbleSort
        </button>
      </div>
    </div>
  );
}
