const musicWrap = document.querySelector(".wrapper");
const musicAudio = musicWrap.querySelector('#main-audio');
const playBtn = musicWrap.querySelector('#play-btn');
const musicPlay = () => {
    playBtn.innerHTML = "pause";
    musicAudio.play();
}
const musicPause = () => {
    playBtn.innerHTML = "play_arrow"
    musicAudio.pause();
}
playBtn.addEventListener("click", ()=>{
    let getText = playBtn.innerText; //play.Btn.innerHTML
    (getText=="pause")? musicPause() : musicPlay();
});

let list_index=0; // musicList[0]-> musicList[5] 순환호출
const albumImg=musicWrap.querySelector(".m-img > img")
const m_name=musicWrap.querySelector(".name");
const m_artist=musicWrap.querySelector(".artist");
const loadMusic=(num)=>{
    albumImg.src=`images/${musicList[num].img}.jpg`;//img정보
    musicAudio.src=`songs/${musicList[num].audio}.mp3`//audio경로
    m_name.innerText=musicList[num].name;//name글자정보
    m_artist.innerText=musicList[num].artist//artist글자정보
}
window.addEventListener("load",()=>{
    loadMusic(list_index);
});
const progressive = musicWrap.querySelector(".m-progress");
const progressBar = progressive.querySelector(".bar");
const playTime = progressive.querySelector('.current');
const totalTime = progressive.querySelector('.duration');
// this, event.target, event.currentTarget
musicAudio.addEventListener("timeupdate", (event) => {
    let current = event.target.currentTime;
    let duration = event.target.duration;
    let progressRatio = (current / duration) * 100; //백분율 계산
    progressBar.style.width = `${progressRatio}%`

    let currentMin=Math.floor(current/60);
    let currentSec=Math.floor(current%60);
    if(currentSec<10){currentSec=`0${currentSec}`;}
    playTime.innerHTML=`${currentMin}:${currentSec}`;

    musicAudio.addEventListener("loadeddata", (e) => { console.log("ch");
        let totalDuration = musicAudio.duration;
        console.log(totalDuration, duration)
        let totalMin = Math.floor(totalDuration/60);
        let totalSec = Math.floor(totalDuration%60);
        if (totalSec < 10) { totalSec = `0${totalSec}`; } // "0"+totalSec
        totalTime.innerHTML = `${totalMin}:${totalSec}`
        //전체시간표시
    });
});

const prveBtn=musicWrap.querySelector('#prev-btn');
const nexBtn=musicWrap.querySelector('#next-btn');
const prveMusic=()=>{
    list_index--;
    if(list_index<0){list_index=musicList.length-1;}
    loadMusic(list_index);
    musicPlay();
}   
const nextMusic=()=>{
    list_index++;
    if(list_index>=musicList.length){list_index=0;}
    //(list_index>=music.length)? list_index=0:list_index=list_index;
    loadMusic(list_index);
    musicPlay();
}
prveBtn.addEventListener("click",()=>{
    prveMusic();
});
nexBtn.addEventListener("click",()=>{
    nextMusic();
});
/*
    obj.clientWidth, clientHeight (padding포함 크기인식)
    obj.offsetWidth, offsetHeight (bordervhgka 크기인식)
    obj.getBoundingClientRect() - .width / .height (border+padding포함)
*/
progressive.addEventListener("click",(e)=>{
    let maxWidth=progressive.clientWidth;
    let clickXposition=e.offsetX;
    let totalDuration=musicAudio.duration;
    musicAudio.currentTime=(clickXposition/maxWidth)*totalDuration;
    musicPlay();
});
const mRepaet=musicWrap.querySelector('#repeat-btn');
musicAudio.addEventListener("ended",()=>{
    let getText=mRepaet.innerText;
    if(getText=="repeat"){nextMusic();}
});
const musicList=[
    {
        name:"Alone", artist:"Color Out", img:"album1", audio:"Alone"
    },
    {
        name:"Mahidevran - Maze of sorrow", artist:"Mahidevran rock band", img:"album2", audio:"Mahidevran-Maze_of_sorrow"
    },
    {
        name:"No Rest Or Endless Rest", artist:"Lisofv", img:"album3", audio:"No_Rest_Or_Endless_Rest"
    },
    {
        name:"Old Melody ", artist:"TAB", img:"album4", audio:"Old_Money"
    },
    {
        name:"Tantalizing Youth", artist:"Social Square", img:"album5", audio:"Tantalizing_Youth"
    },
    {
        name:"The Deep", artist:"Anitek", img:"album6", audio:"The_Deep"
    },
]