import React from 'react'

export default function SummaaryCard(props) {

  const { summary } = props;
  // console.log("summary",summary);
  const onButtonClick =(url)=>{
    fetch(url).then((response) => {
      response.blob().then((blob) => {
       
          // Creating new object of PDF file
          const fileURL =
              window.URL.createObjectURL(blob);
               
          // Setting various property values
          let alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = url.split("/").at(-1);
          alink.click();
      });
  });
  }

  return (


<div className="card col-sm-12 col-md-4" style={{width: "18rem"}}>
<embed src = {summary.url} type="application/pdf" className='card-top w-100' />  
<div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button className='btn btn-info' onClick={()=>{onButtonClick(summary.url)}}>
                    Download PDF
                </button>  </div>
</div>

//     <div className='card text-center w-50'>

//         <h3>{summary.userId} </h3>
//         <h3>{summary.courseId} </h3>
// <div>

//

/* <button onClick={()=>{onButtonClick(summary.url)}}>
                    Download PDF
                </button> */


// </div>

//     </div>
  )
}
