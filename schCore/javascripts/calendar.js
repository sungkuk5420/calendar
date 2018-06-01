// Visual Studio references


var today = moment().startOf('day');
var currentMousePos = { x: -1, y: -1 };
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
            start: moment(today).add('days', 3),
            end: moment(today).add('days', 4),
            classes: 'item-status-three'
        },
        {
            id: 1,
            name: 'プロジェクトC',
            subInfo: '情報',
            sectionID: 3,
            start: moment(today).add('days', 2),
            end: moment(today).add('days', 6),
            classes: 'item-status-one'
        },
        {
            id: 2,
            name: 'プロジェクトA',
            start: moment(today),
            end: moment(today).add('days', 9),
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
    }
};

var EventPopup = {

    init : function(){
        var $popup = $('.event-save-popup');
        $popup.find('.change').on('click',function(){
            EventPopup.eventChange();
        });
        $popup.find('.save').on('click',function(){
            EventPopup.eventSave();
        });
        $popup.find('.cancel').on('click',function(){

            if($popup.hasClass('show')){
                EventPopup.close();
            }

        });
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
            }
            if(activeKey === 'save'){
                $popup.find('.change').addClass('hide');
                $popup.find('.save').removeClass('hide');
            }else if(activeKey === 'change'){
                $popup.find('.save').addClass('hide');
                $popup.find('.change').removeClass('hide');
                $popup.find('.end-date').val(moment(eventData.end-eventData.start).format('D'));
            }
            $popup.data('eventData',eventData).css({'left':currentMousePos.x+'px','top':currentMousePos.y+'px'}).addClass('show');

        }
    },
    eventChange : function(){
        var eventData = EventPopup.getPopupData();
        var itemIndex = -1;
        Calendar.Items.forEach(function(item,index){
          if(item.id === eventData.id){
              itemIndex = index;
          }
        });
        Calendar.Items[itemIndex] = eventData;
        TimeScheduler.Init();
        EventPopup.close();
    },
    eventPopupHide : function(){
        $('.eventHover').removeClass('eventHover');
        $('.event-save-popup').removeClass('show');
    }

};

$(document).ready(function(){
    Calendar.Init();

    EventPopup.init();
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });


});