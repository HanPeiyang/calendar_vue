var vm = new Vue({
    el: '.page_wrap',
    data: {
        currentDay: 0,             //用于保留当日信息，以高亮
        currentMonth: 0,
        year: 0,            //用于保存当前月份页面的信息
        month: 0,
        day: 0,
        weekDays: ['MON', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        am_List: [],        //用于保存已选择打勾的上午的日期
        pm_List: [],        //用于保存已选择打勾的下午的日期
        calendar_Array: [], //用于保存当前月份页面所显示的所有日期
    },
    methods: {
        nextMonth: function () {
            if (this.month == 11) {
                this.month = 0;
                this.year++;
            } else
                this.month++;
        },
        preMonth: function () {
            if (this.month == 0) {
                this.month = 11;
                this.year--;
            } else
                this.month--;
        },
        am_tag: function (index) {
            let object = this.calendar_Array[index];
            for (var j = 0; j < this.pm_List.length; j++) {
                if (this.pm_List[j].year == object.year && this.pm_List[j].month == object.month && this.pm_List[j].day == object.day)
                    break;
            }
            if(j<this.pm_List.length){
                this.pm_List.splice(j,1);
                this.am_List.push(object);
            }
            
            else{
                for (var i = 0; i < this.am_List.length; i++) {
                    if (this.am_List[i].year == object.year && this.am_List[i].month == object.month && this.am_List[i].day == object.day)
                        break;
                }
                if(i==this.am_List.length){
                    this.am_List.push(object)
                }
                else{
                    this.am_List.splice(i,1);
                }
            }
            
            
            
        },
        pm_tag: function (index) {
            let object = this.calendar_Array[index];

            for (var j = 0; j < this.am_List.length; j++) {
                if (this.am_List[j].year == object.year && this.am_List[j].month == object.month && this.am_List[j].day == object.day)
                    break;
            }
            if(j<this.am_List.length){
                this.am_List.splice(j,1);
                this.pm_List.push(object);
            }
            
            else{
                for (var i = 0; i < this.am_List.length; i++) {
                    if (this.pm_List[i].year == object.year && this.pm_List[i].month == object.month && this.pm_List[i].day == object.day)
                        break;
                }
                if(i==this.pm_List.length){
                    this.pm_List.push(object)
                }
                else{
                    this.pm_List.splice(i,1);
                }
            }
        },
        contain: function (List, index) {
            let object = this.calendar_Array[index];
            for (var i = 0; i <List.length; i++) {
                if (List[i].year == object.year && List[i].month == object.month && List[i].day == object.day)
                    break;
            }
            if (i < List.length)
               return true;
            else {
               return false;
            }
        }
    },
    computed: {
        calendarArr: function () {

            let firstDate = new Date(this.year, this.month, 1);
            let firstWeekday = firstDate.getDay();
            if (firstWeekday == 0)
                firstWeekday = 7;
            let startTime = firstDate - (firstWeekday - 1) * 24 * 60 * 60 * 1000;
            this.calendar_Array = [];
            for (let i = 0; i < 42; i++) {
                let new_date = new Date(startTime + i * 24 * 60 * 60 * 1000);
                this.calendar_Array.push({
                    year: new_date.getFullYear(),
                    month: new_date.getMonth(),
                    day: new_date.getDate(),
                })
            }
            
            return this.calendar_Array;

        },

    },
    mounted() {
        let currentDate = new Date();
        this.year = currentDate.getFullYear();
        this.month = currentDate.getMonth();
        this.day = currentDate.getDate();
        this.currentDay = currentDate.getDate();
        this.currentMonth = currentDate.getMonth();
    },
})