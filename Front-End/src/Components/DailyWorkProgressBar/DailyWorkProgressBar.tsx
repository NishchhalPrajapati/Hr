import React, {FunctionComponent} from 'react'
import './DailyWorkProgressBar.css'
type props= {
    ProgressBarcolor:string;
    ProgressBarWidth:number;
    ProgressBarHeight:number;

}
const DailyWorkProgressBar:FunctionComponent<props> = ({ProgressBarcolor,ProgressBarWidth,ProgressBarHeight}) => {
    return (
        <>
            <div className="DailyProgressBarBox">
            < div className="DailyProgressBar" style={{backgroundColor:`${ProgressBarcolor}`,width:ProgressBarWidth+"px",height:ProgressBarHeight+"px",
    transition: `height 1s ease-in-out`  }}>

            </div>
            </div>
        </>
    )
}

export default DailyWorkProgressBar
