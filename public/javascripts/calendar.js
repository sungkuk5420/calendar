// Visual Studio references


var today = moment().startOf('day');
var currentMousePos = { x: -1, y: -1 };
var schedulerScrollPosition = 0;
var Calendar = {
    Periods: [
        {
            Name: '1 week',
            Label: '週',
            TimeframePeriod: (60 * 24),
            TimeframeOverall: (60 * 24 * 7),
            TimeframeHeaders: [
                'MM月',
                'DD日',
                'ddd'
            ],
            Classes: 'period-1week'
        },
        {
            Name: '1 month',
            Label: '月',
            TimeframePeriod: (60 * 24 * 1),
            TimeframeOverall: (60 * 24 * 31),
            TimeframeHeaders: [
                'YYYY年 MM月',
                'DD',
                'ddd'
            ],
            Classes: 'period-1month'
        }
    ],

    Items: [
        {
            id: 0,
            name: 'プロジェクトD',
            subInfo: '情報',
            sectionID: 1,
            start: moment(moment(today).format('YYYY-MM')+'-01').add('days', 3),
            end: moment(moment(today).format('YYYY-MM')+'-01').add('days', 4),
            classes: 'item-status-three'
        },
        {
            id: 1,
            name: 'プロジェクトC',
            subInfo: '情報',
            sectionID: 3,
            start: moment(moment(today).format('YYYY-MM')+'-01').add('days', 2),
            end: moment(moment(today).format('YYYY-MM')+'-01').add('days', 6),
            classes: 'item-status-one'
        },
        {
            id: 2,
            name: 'プロジェクトA',
            start: moment(moment(today).format('YYYY-MM')+'-01'),
            end: moment(moment(today).format('YYYY-MM')+'-01').add('days', 9),
            sectionID: 1,
            classes: 'item-status-none'
        }
    ],

    Sections: [
        {
            id: 1,
            name: '大澤 明生'
        },
        {
            id: 2,
            name: '石田 富一'
        },
        {
            id: 3,
            name: '大友 勝郎'
        },
        {
            id: 4,
            name: '佐々木 裕二'
        },
        {
            id: 5,
            name: '森元 弘'
        },
        {
            id: 6,
            name: '小林 寛正'
        },
        {
            id: 7,
            name: '鈴木 孝文'
        },
        {
            id: 8,
            name: '渡邊 友之'
        },
        {
            id: 9,
            name: '佐藤 健'
        },
        {
            id: 10,
            name: '大澤 明生'
        },
        {
            id: 11,
            name: '石田 富一'
        },
        {
            id: 12,
            name: '大友 勝郎'
        },
        {
            id: 13,
            name: '佐々木 裕二'
        },
        {
            id: 14,
            name: '森元 弘'
        },
        {
            id: 15,
            name: '小林 寛正'
        },
        {
            id: 16,
            name: '鈴木 孝文'
        },
        {
            id: 17,
            name: '渡邊 友之'
        },
        {
            id: 18,
            name: '佐藤 健'
        },
        {
            id: 19,
            name: '佐々木 裕二'
        },
        {
            id: 20,
            name: '石田 富一'
        },
        {
            id: 21,
            name: '石田 富一1'
        },
        {
            id: 22,
            name: '石田 富一2'
        },
        {
            id: 23,
            name: '石田 富一3'
        },
        {
            id: 24,
            name: '石田 富一4'
        },
        {
            id: 25,
            name: '石田 富一5'
        },
        {
            id: 26,
            name: '石田 富一'
        },
        {
            id: 27,
            name: '石田 富一'
        },
        {
            id: 28,
            name: '石田 富一'
        },
        {
            id: 29,
            name: '石田 富一'
        },
        {
            id: 30,
            name: '石田 富一'
        }
    ],

    Init: function () {
        TimeScheduler.Options.GetSections = Calendar.GetSections;
        TimeScheduler.Options.GetSchedule = Calendar.GetSchedule;
        TimeScheduler.Options.Start = moment(moment(today).format('YYYY-MM')+'-01');
        TimeScheduler.Options.Periods = Calendar.Periods;
        TimeScheduler.Options.SelectedPeriod = '1 month';
        TimeScheduler.Options.Element = $('.calendar');

        TimeScheduler.Options.AllowDragging = true;
        TimeScheduler.Options.AllowResizing = true;

        TimeScheduler.Options.Events.ItemClicked = Calendar.Item_Clicked;
        TimeScheduler.Options.Events.ItemDropped = Calendar.Item_Dragged;
        TimeScheduler.Options.Events.ItemResized = Calendar.Item_Resized;

        TimeScheduler.Options.Events.ItemMovement = Calendar.Item_Movement;
        TimeScheduler.Options.Events.ItemMovementStart = Calendar.Item_MovementStart;
        TimeScheduler.Options.Events.ItemMovementEnd = Calendar.Item_MovementEnd;

        TimeScheduler.Options.InitCallback = Calendar.InitCallback;

        TimeScheduler.Options.Text.NextButton = '&nbsp;';
        TimeScheduler.Options.Text.PrevButton = '&nbsp;';

        TimeScheduler.Options.MaxHeight = 100;

        TimeScheduler.Init();
    },

    GetSections: function (callback) {
        callback(Calendar.Sections);
    },

    GetSchedule: function (callback, start, end) {
        callback(Calendar.Items);
    },

    Item_Clicked: function (item) {
        console.log(item);
        var eventData = {
            id: item.id,
            name: item.name,
            subInfo: item.subInfo,
            start: item.start,
            end: item.end,
            sectionID: item.sectionID,
            classes: item.classes
        };
        EventPopup.eventPopupShow(eventData,'change');
    },

    Item_Dragged: function (item, sectionID, start, end) {
        var foundItem;

        for (var i = 0; i < Calendar.Items.length; i++) {
            foundItem = Calendar.Items[i];

            if (foundItem.id === item.id) {
                foundItem.sectionID = sectionID;
                foundItem.start = start;
                foundItem.end = end;

                Calendar.Items[i] = foundItem;
            }
        }

        TimeScheduler.Init();
    },

    Item_Resized: function (item, start, end) {
        var foundItem;

        for (var i = 0; i < Calendar.Items.length; i++) {
            foundItem = Calendar.Items[i];

            if (foundItem.id === item.id) {
                foundItem.start = start;
                foundItem.end = end;

                Calendar.Items[i] = foundItem;
            }
        }

        TimeScheduler.Init();
    },

    Item_Movement: function (item, start, end ) {
        var html;
        html =  '<div>';
        html += '   <div>';
        html += '       Start: ' + start.format('Do MMM YYYY HH:mm');
        html += '   </div>';
        html += '   <div>';
        html += '       End: ' + end.format('Do MMM YYYY HH:mm');
        html += '   </div>';
        html += '</div>';

        $('.realtime-info').empty().append(html);
    },

    Item_MovementStart: function () {
        $('.realtime-info').show();
    },

    Item_MovementEnd: function () {
        $('.realtime-info').hide();
    },
    InitCallback : function(){
        TimeScheduler.simpleScrollInit();
        $('.time-sch-section-wrapper').height($('.time-sch-table.time-sch-table-content').height());
        $('.ui-draggable').on('mousedown',function(){

            if($('.event-save-popup').hasClass('show')){
                EventPopup.eventPopupHide();
            }

        });
    }
};

var EventPopup = {

    init : function(){
        var $popup = $('.event-save-popup');
        $popup.find('.change').on('click',function(){
            EventPopup.eventChange();
        });
        $popup.find('.remove').on('click',function(){
            EventPopup.eventRemove();
        });
        $popup.find('.save').on('click',function(){
            EventPopup.eventSave();
        });
        $popup.find('.cancel').on('click',function(){
            EventPopup.close();
        });

        $popup.find('.date-image').click(function(){
            $(document.createElement('input'))
                .attr('type', 'text')
                .css({
                    position: 'absolute',
                    left: 80,
                    top: 10
                })
                .appendTo($(this)).datepicker({
                onClose: function () {
                    $(this).remove();
                },
                onSelect: function (date) {
                    $popup.find('.start-date').text(moment(date).format('YYYY-MM-DD'));
                },
                defaultDate: moment($popup.find('.start-date').text()).toDate()
            }).datepicker('show').hide();
        });

        EventPopup.eventEndTimeBtnEventBind();


    },

    eventSave : function(){

        var eventData = EventPopup.getPopupData();
        Calendar.Items.push(eventData);
        TimeScheduler.Init();
        EventPopup.close();
    },

    close : function(){
        EventPopup.eventPopupHide();
    },

    getPopupData : function(){
        var $popup = $('.event-save-popup');
        var startDate = $popup.find('.start-date').text(),
            endDate = $popup.find('.end-date').val()-1,
            name = $popup.find('.project-name').val(),
            subInfo = $popup.find('.sub-info').val(),
            originalData = $popup.data('eventData');
        return {
            id: originalData.id,
            name:  name,
            subInfo: subInfo,
            start: moment(startDate),
            end: moment(startDate).add('days',endDate),
            sectionID: originalData.sectionID,
            classes: originalData.classes
        }
    },

    eventPopupShow : function(eventData,activeKey){
        //id: newItemId+1,
        //name: $dragObj.find('.title').text().trim() ,
        //subInfo: $dragObj.find('.sub-info').text().trim(),
        //start: moment(date),
        //end: moment(date),
        //sectionID: $thisObj.data('section').id,
        //classes: $dragObj.data('class')
        var $popup = $('.event-save-popup');


        if($popup.hasClass('show')){

        }else{
            if(eventData !== undefined){
                $popup.find('.start-date').text(eventData.start.format('YYYY-MM-DD'));
                $popup.find('.project-name').val(eventData.name);
                $popup.find('.sub-info').val(eventData.subInfo);
                $popup.find('.end-date').val(1);
                $popup.find('.start-time').val('0:00');
                $popup.find('.end-time').val('24:00');
            }
            if(activeKey === 'save'){
                $popup.find('.change, .remove').addClass('hide');
                $popup.find('.save').removeClass('hide');
            }else if(activeKey === 'change'){
                $popup.find('.save').addClass('hide');
                $popup.find('.change, .remove').removeClass('hide');
                $popup.find('.end-date').val(moment(eventData.end-eventData.start).format('D'));
            }
            $popup.data('eventData',eventData).css({'left':currentMousePos.x+'px','top':currentMousePos.y+'px'}).addClass('show');

        }
    },
    eventChange : function(){
        var eventData = EventPopup.getPopupData();
        var itemIndex = arrayObjectIndexOf(Calendar.Items, eventData.id,"id" ); //

        Calendar.Items[itemIndex] = eventData;
        TimeScheduler.Init();
        EventPopup.close();
    },
    eventRemove : function(){
        var eventData = EventPopup.getPopupData();
        var newArr = Calendar.Items.filter(function(item){
            return item.id !== eventData.id;
        });
        Calendar.Items = newArr;
        TimeScheduler.Init();
        EventPopup.close();
    },
    eventPopupHide : function(){
        $('.eventHover').removeClass('eventHover');
        $('.event-save-popup').removeClass('show');
    },

    eventEndTimeBtnEventBind : function(){
        var $popup = $('.event-save-popup');
        var $result=$popup.find('.end-date');
        var isDown=0;
        var delay=100;
        var nextTime=0;

        requestAnimationFrame(watcher);
        var $upDownBtn = $popup.find(".fa-sort-up, .fa-sort-down");
        $upDownBtn.mousedown(function(e){handleMouseDown(e);});
        $upDownBtn.mouseup(function(e){handleMouseUp(e);});
        $upDownBtn.mouseout(function(e){handleMouseUp(e);});
        function handleMouseDown(e){
            e.preventDefault();
            e.stopPropagation();
            isDown=($(e.target).hasClass('fa-sort-up'))?1:-1;
        }

        function handleMouseUp(e){
            e.preventDefault();
            e.stopPropagation();
            isDown=0;
        }

        function watcher(time){
            requestAnimationFrame(watcher);
            if(!$popup.hasClass('show')){
                return false;
            }
            var number=parseInt($result.val());
            if(time<nextTime){return;}
            nextTime=time+delay;
            if(isDown!==0){
                number+=isDown;
                if( ( ( $result.val() == 1) && ( isDown == -1))
                    || ( ( $result.val() == 99) && ( isDown == +1))){
                    return false;
                }else{
                    $result.val(number);
                }
            }
        }

    }

};

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

function getBtnDate(date, key){
    var moveDate = date ;

    switch(key){
        case 'prev-month':
            moveDate = moveDate.add('months',-1);
            break;
        case 'next-month':
            moveDate = moveDate.add('months',+1);
            break;
        case 'prev-day':
            moveDate = moveDate.add('days',-1);
            break;
        case 'next-day':
            moveDate = moveDate.add('days',+1);
            break;
    }

    return moveDate;
}


$(document).ready(function(){
    Calendar.Init();

    EventPopup.init();
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });

    $('.start-time').timepicker({
        'scrollDefault': 'now',
        'minTime': '07:00am',
        'maxTime': '11:00am',
        'showDuration': false,
        //'disableTimeRanges': [
        //    ['1am', '2am'],
        //    ['3am', '4:01am']
        //],
        //'noneOption': [
        //    {
        //        'label': 'Foobar',
        //        'className': 'shibby',
        //        'value': '42'
        //    },
        //    'Foobar2'
        //],
        'timeFormat': 'H:i',
        'step': 60
    });

    $('.end-time').timepicker({
        'scrollDefault': 'now',
        'minTime': '12:00pm',
        'maxTime': '10:00pm',
        'showDuration': false,
        //'disableTimeRanges': [
        //    ['1am', '2am'],
        //    ['3am', '4:01am']
        //],
        //'noneOption': [
        //    {
        //        'label': 'Foobar',
        //        'className': 'shibby',
        //        'value': '42'
        //    },
        //    'Foobar2'
        //],
        'timeFormat': 'H:i',
        'step': 60
    });


    var btnClickFunc = function(){
            $(this).addClass('press');
        },
        btnOverFunc = function(){
            $(this).addClass('over');
        },
        btnMouseUpFunc = function(){
            $(this).removeClass('press');
        },
        btnLeaveFunc = function(){
            $(this).removeClass('over').removeClass('press');
        };

    var $btnObjects = $('.btn');
    $btnObjects.unbind('mousedown',btnClickFunc).bind('mousedown',btnClickFunc);
    $btnObjects.unbind('mouseover',btnOverFunc).bind('mouseover',btnOverFunc);
    $btnObjects.unbind('mouseup',btnMouseUpFunc).bind('mouseup',btnMouseUpFunc);
    $btnObjects.unbind('mouseleave',btnLeaveFunc).bind('mouseleave',btnLeaveFunc);

    var $headerMenu = $('.calendar-fill-header');
    $headerMenu.find('.today').click(function(){
        TimeScheduler.Options.Start = moment(today);
        TimeScheduler.Init();
    });

    $headerMenu.find('.move-date-btn').click(function(){
        var $thisObj = $(this);
        var value = 0;
        var key = $thisObj.data('key');
        var moveDate = getBtnDate(moment(TimeScheduler.Options.Start),key);
        TimeScheduler.Options.Start = moveDate;
        TimeScheduler.Init();
    });
    $headerMenu.find('.move-calendar').click(TimeScheduler.GotoTimeShift_Clicked);

});