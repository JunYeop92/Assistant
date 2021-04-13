export default function FocusRecord({ $target, initialState }) {
    this.state = initialState;
    this.$element = document.createElement('div');

    this.initialize = async () => {
        this.$element.id = 'record';
        this.$element.innerHTML = 
        `<div class="dropdown">
            <div class="dropbtn">
                <span><i class="fas fa-history"></i></span>
            </div>
            <ul class="dropdown-list">
            </ul>
        </div>`;
        $target.appendChild(this.$element);
    };

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        let oldYmd = 0;
        const htmlString = this.state.recordList
            .map(({ ymd, endDate, startDate, totalTime }) => {
                let str = '';
                if (ymd !== oldYmd) {
                    str = `<li class='ymd'>${ymd}</li>`;
                    oldYmd = ymd;
                }
                str += `<li class='date'>
                            <span>${toHourMinFormat(startDate)} ~ ${toHourMinFormat(endDate)}</span>
                            <span>${totalTime}</span>
                        </li>`;
                return str;
            })
            .join('');
        this.$element.querySelector('.dropdown-list').innerHTML = htmlString;
    };

    this.attachEvent = () => {
        const $dropbtn = this.$element.querySelector('.dropbtn')
        $dropbtn.addEventListener('click', (e) => {
            $dropbtn.classList.toggle('click');
        });
    };

    this.initialize();
    this.attachEvent();
}

const toHourMinFormat = (strDate) => {
    const date = new Date(strDate);
    const hour = date.getHours();
    const min = date.getMinutes();

    return (hour > 9 ? hour : '0' + hour) + ':' + (min > 9 ? min : '0' + min);
};
