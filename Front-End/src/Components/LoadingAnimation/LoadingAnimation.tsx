import React,{FunctionComponent} from 'react';
import './LoadingAnimation.css';
type props= {
    ProgressBarcolor:string;
    ProgressBarWidth:number;
    ProgressBarHeight:number;

}
const LoadingAnimation:FunctionComponent<props>=({ProgressBarcolor,ProgressBarWidth,ProgressBarHeight})=>{
    return (
        <>
        <div className="ProgressBarBox">
            < div className="ProgressBar" style={{backgroundColor:`${ProgressBarcolor}`,width:ProgressBarWidth+"px",height:ProgressBarHeight+"px"}}>

            </div>
        </div> 
        </>
    )
}

export default LoadingAnimation;

