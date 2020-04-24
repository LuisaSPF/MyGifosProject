// Declare steps and main elements

const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');
const video = document.getElementById('video');
const image = document.getElementById('image');

// Main Buttons

const btnCrearG = document.getElementById('crearG');
const buttonBegin = document.getElementById('buttonBegin');
const buttonCapture = document.getElementById('buttonCapture');
const btnMiniCapturar = document.getElementById('dropbtn');
const buttonReady = document.getElementById('buttonReady');
const btnMiniListo = document.getElementById('okbtn');
const buttonRepeat = document.getElementById('buttonRepeat');
const buttonUpload = document.getElementById('buttonUpload');
const CancButton = document.getElementById('CancButton');
const buttonCancel1 = document.getElementById('buttonCancel1');

// Views Tittles

const titulo1 = document.getElementById('chequeo');
const titulo2 = document.getElementById('capturando');
const titulo3 = document.getElementById('previa');

// Results new gifs element by LocalStorage

const theNGif = document.getElementById('myNewGif');
const elementsGifs = document.getElementById('misgifs');


let gifsSaved = localStorage.getItem('gif');
let misGifs = [];
misGifs = JSON.parse(gifsSaved);
if(misGifs !== null){
    misGifs.forEach(element =>{
        gifHTML = `<div class="misGuifos"><img src="${element}" alt="Gif subido"></div>`
        elementsGifs.innerHTML += gifHTML;
    })
} else{
    misGifs = [];
}

//Activate camera resources
        
let recorder;
buttonBegin.addEventListener('click', (e) => {
        step1.style.display="none";
        step3.style.display="none";
        step4.style.display="none";
        step2.style.display="block";
        video.style.display="block";
        image.style.display="none";
        buttonRepeat.style.display="none";
        buttonUpload.style.display="none";
        buttonReady.style.display="none";
        btnMiniListo.style.display="none";
        titulo1.style.display="block";
        titulo2.style.display="none";
        titulo3.style.display="none";
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(function(stream){
            video.srcObject = stream;
            video.play();
                recorder = RecordRTC(stream, {
                type: 'gif',
                framRate: 1,
                quality: 10,
                hidden: 240,
            });
        });
    });
        
//Cancel and hide step1

        buttonCancel1.addEventListener('click', ()=>{
            step1.style.display="none";
        })
        
        
//Start record  

        buttonCapture.addEventListener('click', ()=>{
            recorder.startRecording();
            buttonCapture.style.display="none";
            btnMiniCapturar.style.display="none";
            buttonReady.style.display="block";
            btnMiniListo.style.display="block";
            titulo1.style.display="none";
            titulo2.style.display="block";
            
        })
        

//Show timer

        let timer;
        buttonCapture.addEventListener('click', ()=>{
            let segundos = 0;
            let minutos = 0;

            timer = setInterval(()=>{
                if(segundos < 60){
                    if(segundos <= 9){
                        segundos = '0' + segundos;
                    }
                    document.getElementById('timer').innerHTML=`00:00:0${minutos}:${segundos}`;
                    segundos++;
                }else{
                    minutos++;
                    segundos = 0;
                }
            },1000)
        })
 
//Finish record and save
        
        buttonReady.addEventListener('click', (e)=>{
            clearInterval(timer);
            recorder.stopRecording() 
                video.style.display="none";
                image.style.display="block";
                blob = recorder.getBlob();
                image.src = URL.createObjectURL(blob);
                buttonReady.style.display="none";
                btnMiniListo.style.display="none";
                buttonRepeat.style.display="block";
                buttonUpload.style.display="block";
                titulo2.style.display="none";
                titulo3.style.display="block"; 
            })

//Repeat process
    
        buttonRepeat.addEventListener('click', ()=>{
                video.style.display="block";
                image.style.display="none";
                step2.style.display="block";
                step3.style.display="none";
                recorder.startRecording();
                buttonCapture.style.display="block";
                btnMiniCapturar.style.display="none";
                buttonReady.style.display="none";
                btnMiniListo.style.display="none";
                buttonRepeat.style.display="none";
                buttonUpload.style.display="none";
                
            })

//Gif Upload to Giphy

        buttonUpload.addEventListener('click', (e)=>{
                step2.style.display="none";
                step3.style.display="block";
                let form = new FormData();
                form.append('file', blob, 'GifRecorder.gif');
                const api_key = 'Hnx2L1hPH1KOGExTql4qg4hzUF78lwQA'
                const url = `http://upload.giphy.com/v1/gifs`
                form.append('api_key', api_key)
            

                fetch(url,{
                    method:'POST',
                    body: form,
                }).then(res=>res.json())
                .then(datar=>{
                    let giphyId = datar.data.id;
                    let rutaGif = `http://api.giphy.com/v1/gifs/${giphyId}?api_key=${api_key}`
                    fetch(rutaGif).then(res => res.json())
                        .then(json =>{
                        urlGiphy = json.data.url;
                        let urlImage = json.data.images.fixed_width.url;
                        console.log(datar);
                        theNGif.setAttribute('src', urlImage);
                        step3.style.display="none";
                        step4.style.display="block";
                        makeAGif(urlImage);  
                    })
                })
        });


// Upload progress bar animation

let progressBar = 0;
let theSquare = document.querySelectorAll('.squareFigure');

setInterval(()=>{
    if(progressBar<theSquare.length){
        theSquare.item(progressBar).classList.toggle('activo');
        progressBar++;
    }else{
        progressBar = 0;
    }
},100);


// Giphy download


        buttonDownload.addEventListener('click', ()=>{
            recorder.save();
        });

// Giphy link copy
        
        CopyButton.addEventListener('click', ()=>{
            copyOption();
            
        })
        function copyOption(){
            let aux = document.createElement("input");
            aux.setAttribute('value', urlGiphy);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand('copy');
            document.body.removeChild(aux);
        }


// Final step and close window

        buttonClose.addEventListener('click', ()=>{
            step4.style.display="none";
        })

// LocalStorage GIFS

function makeAGif(urlImage){
    misGifs.push(urlImage);
    gifHTML = `<div class="misGuifos"><img src="${urlImage}" alt="Gif-arriba"></div>`
    elementsGifs.innerHTML += gifHTML;
    localStorage.setItem('gif', JSON.stringify(misGifs));
}




     