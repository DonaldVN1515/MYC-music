const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playList = $('.playlist__list');
const heartBtn = $('.js-heart');
const repeatBtn = $('.js-repeat');
const prevBtn = $('.js-prev');
const playerBtn = $('.control__player');
const pausingBtn = $('.js-pausing');
const nextBtn = $('.js-next');
const randomBtn = $('.js-random');
const nameSong = $('.playlist__name');
const remainingTime = $('.js-remaining');
const durationTime = $('.js-duration');
const audio = $('#audio');
const progress = $('#range');

const app = {
	isPlaying: false,
	isRandom: false,
	isRepeat: false,
	isHeart: false,
	currentIndex: 0,
	songs: [
		{
			name: 'Bài ca tuổi trẻ',
			singer: 'DonaldVN',
			path: './assets/music/Bai-Ca-Tuoi-Tre-DJ-Minh-Tri-Remix-DJ-Minh-Tri.mp3',
			img: './assets/img/LogoV.png',
			durationSong: '04:32',
		},
		{
			name: 'Bánh mì Không',
			singer: 'Đạt G - Phương Uyên',
			path: './assets/music/Banh-Mi-Khong-Dat-G-DuUyen.mp3',
			img: './assets/img/LogoV.png',
			durationSong: '04:05',
		},
		{
			name: 'Có anh ở đây rồi',
			singer: 'DonaldVN',
			path: './assets/music/Co-Anh-O-Day-Roi-Dj-Thanh-Nguyen-ft-Anh-Chau-Remix-Anh-Quan-Idol.mp3',
			img: './assets/img/LogoV.png',
			durationSong: '03:53',
		},
		{
			name: 'Dường như thói quen',
			singer: 'DonaldVN',
			path: './assets/music/Dung-Nhu-Thoi-Quen-JayKii-Sara-Luu.mp3',
			img: './assets/img/LogoV.png',
			durationSong: '04:26',
		},
		{
			name: 'Em ổn không?',
			singer: 'DonaldVN',
			path: './assets/music/Em-On-Khong-Trinh-Thien-An-ViruSs.mp3',
			img: './assets/img/LogoV.png',
			durationSong: '05:19',
		},
		{
			name: 'End of time',
			singer: 'DonaldVN',
			path: './assets/music/End-Of-Time-K-391-Alan-Walker-Ahrix.mp3',
			img: './assets/img/LogoV.png',
			durationSong: '03:07',
		},
		{
			name: 'How do you like that',
			singer: 'DonaldVN',
			path: './assets/music/HowYouLikeThat-BLACKPINK-6720100.mp3',
			img: './assets/img/LogoV.png',
			durationSong: '02:49',
		},
		{
			name: 'I lose myself',
			singer: 'DonaldVN',
			path: './assets/music/If-I-Lose-Myself-Madilyn-Bailey.mp3',
			img: './assets/img/LogoV.png',
			durationSong: '03:11',
		},
		{
			name: 'Lemon tree',
			singer: 'DonaldVN',
			path: './assets/music/Lemon+Tree.mp3',
			img: './assets/img/LogoV.png',
			durationSong: '03:09',
		},
		{
			name: 'Memories',
			singer: 'DonaldVN',
			path: './assets/music/Memories-Maroon5-6091839.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'My love',
			singer: 'DonaldVN',
			path: './assets/music/My Love - Westlife.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'Unfollow',
			singer: 'DonaldVN',
			path: './assets/music/Unfollow-Tua-Freaky-CM1X.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'Vợ tuyệt vời nhất',
			singer: 'DonaldVN',
			path: './assets/music/Vo-Tuyet-Voi-Nhat-Vu-Duy-Khanh.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'Yêu rồi',
			singer: 'DonaldVN',
			path: './assets/music/Yeu-Roi-Gao-Nep-Gao-Te-OST-Tino.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'You are my everything',
			singer: 'DonaldVN',
			path: './assets/music/You Are My Everything - Billkin.mp3',
			img: './assets/img/LogoV.png',
		},
	],
	render: function () {
		const htmls = this.songs.map((song, index) => {
			const NumIndex = index + 1;

			return `<li class="playlist__item ${
				index === this.currentIndex ? 'js-active' : ''
			}" data-index="${index}">
                        <h6>${NumIndex < 10 ? '0' + NumIndex : NumIndex}</h6>
                        <h6>${song.name}</h6>
                        <h6>${song.singer}</h6>
                        <h6>${
							song.durationSong ? song.durationSong : '00:00'
						}</h6>
                    </li>`;
		});
		playList.innerHTML = htmls.join('');
	},
	defineProperties: function () {
		Object.defineProperty(this, 'currentSong', {
			get: function () {
				return this.songs[this.currentIndex];
			},
		});
	},

	loadCurrentSong: function () {
		audio.src = this.currentSong.path;
	},
	nextSong: function () {
		this.currentIndex++;
		if (this.currentIndex >= this.songs.length) {
			this.currentIndex = 0;
		}
		this.loadCurrentSong();
	},
	prevSong: function () {
		this.currentIndex--;
		if (this.currentIndex < 0) {
			this.currentIndex = this.songs.length - 1;
		}
		this.loadCurrentSong();
	},
	randomSong: function () {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * this.songs.length);
		} while (newIndex === this.currentIndex);
		{
			this.currentIndex = newIndex;
			this.loadCurrentSong();
		}
	},
	scrollToActiveSong: function () {
		setTimeout(() => {
			$('.playlist__list .js-active').scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}, 200);
	},
	displayTime: function () {
		const { duration, currentTime } = audio;

		function formatTimer(number) {
			const minutes = Math.floor(number / 60);
			const seconds = Math.floor(number - minutes * 60);

			return `${minutes < 10 ? '0' + minutes : minutes}:${
				seconds < 10 ? '0' + seconds : seconds
			}`;
		}

		durationTime.textContent = formatTimer(currentTime);

		if (!duration) {
			remainingTime.textContent = '00:00';
		} else {
			remainingTime.textContent = formatTimer(duration);
		}
		const timer = setInterval(this.displayTime, 100);
	},
	handleEvents: function () {
		const _this = this;

		playerBtn.onclick = function () {
			if (_this.isPlaying) {
				audio.pause();
			} else {
				audio.play();
			}
		};
		audio.onplay = function () {
			_this.isPlaying = true;
			playerBtn.classList.add('js-player');
		};
		audio.onpause = function () {
			_this.isPlaying = false;
			playerBtn.classList.remove('js-player');
		};
		audio.ontimeupdate = function () {
			if (audio.duration) {
				const progressPercent = Math.floor(
					(audio.currentTime / audio.duration) * 100
				);
				progress.value = progressPercent;
			}
		};
		audio.onended = function () {
			if (_this.isRepeat) {
				audio.play();
			} else {
				nextBtn.click();
			}
		};
		progress.onchange = function (e) {
			const seekTime = (audio.duration / 100) * e.target.value;
			audio.currentTime = seekTime;
		};
		heartBtn.onclick = function () {
			_this.isHeart = !_this.isHeart;
			heartBtn.classList.toggle('js-active', _this.isHeart);
		};
		nextBtn.onclick = function () {
			if (_this.isRandom) {
				_this.randomSong();
			} else {
				_this.nextSong();
			}
			audio.play();
			_this.render();
			_this.scrollToActiveSong();
		};
		prevBtn.onclick = function () {
			if (_this.isRandom) {
				_this.randomSong();
			} else {
				_this.prevSong();
			}
			audio.play();
			_this.render();
			_this.scrollToActiveSong();
		};
		randomBtn.onclick = function () {
			_this.isRandom = !_this.isRandom;
			randomBtn.classList.toggle('js-active', _this.isRandom);
		};
		repeatBtn.onclick = function () {
			_this.isRepeat = !_this.isRepeat;
			repeatBtn.classList.toggle('js-active', _this.isRepeat);
		};
		playList.onclick = function (e) {
			const songNode = e.target.closest(
				'.playlist__item:not(.playlist__list .js-active)'
			);

			if (songNode) {
				_this.currentIndex = Number(songNode.dataset.index);
				_this.loadCurrentSong();
				_this.render();
				audio.play();
			}
		};
	},
	start: function () {
		this.defineProperties();

		this.displayTime();

		this.handleEvents();

		this.loadCurrentSong();

		this.render();
	},
};
app.start();
