import { createContext } from "react";
import run from "../config/gemini";
import { useState } from "react";

export const context = createContext();
const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75*index);
    }

    const newChat = () => {
        setLoading(false);
        setResultData(false);
    }

    const onSent = async(prompt) => {

        setResultData("");
        setLoading(true);
        setShowResult(true);
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        }   
        else{
            setPreviousPrompt((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }
        setPreviousPrompt((prev) => [...prev, input]);
        const response = await run(input);
        let responseArr = response.split("**");
        let newArr = [];
        for(let i=0; i<responseArr.length; i++){
            if(i===0 || i%2 !== 1){
                newArr += responseArr[i];
            }
            else{
                newArr += "<b>" + responseArr[i] + "</b>";
            }
        }

        let para = newArr.split("*").join("</br>");
        let newResponseArray= para.split(" ");
        for(let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord+" ");
        }

        // setResultData(newResponseArray);
        setLoading(false);
        setInput("");
}

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        previousPrompt,
        setPreviousPrompt,
        showResult,
        loading,
        resultData,
        setResultData,
        onSent,
        newChat
    }
    

    return (
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )

}
export default ContextProvider;
