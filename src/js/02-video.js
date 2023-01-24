import Player from '@vimeo/player';
import throttle from "lodash.throttle ";
const STORAGE_KEY = 'videoplayer-current-time';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);
getCurrenttime();

player.on('timeupdate', throttle(writeCurrenttime, 1000));
    
function writeCurrenttime(data) {
    const savedTime = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, savedTime);
}

function getCurrenttime() {
        const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const parsedTime = JSON.parse(saved);
        const time = parsedTime.seconds;
        player.setCurrentTime(time);
    }
};

