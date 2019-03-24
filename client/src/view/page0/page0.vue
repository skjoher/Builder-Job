<template>
<div>
<Row>
    

<div>
<Card style="width:80%">
    <p slot="title">Event Table</p>
      <Button slot="extra" type="primary" @click="value3 = true"><Icon type="ios-add" />Add</Button>
  <div>
    <full-calendar class="test-fc" :events="fcEvents" 
      first-day='1' locale="fr"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick">
        <template slot="fc-event-card" scope="p">
            <p><i class="fa">sadfsd</i> {{ p.event.title }} test</p>
        </template>
    </full-calendar>
  </div>
</Card>
</div>
</Row>
</div>
</template>


<script>
let demoEvents = [

    {
      title : 'Linux Kernel release Day',
      start : '2019-03-20',
      end : '2019-03-22'
    },
    {
        title : 'ToDO 2/27-2/28',
        start : '2019-03-23',
        end : '2019-03-25'
    },
    {
        title : 'Task Exec D-00-XC',
        start : '2019-03-1',
        end : '2019-03-8'
    },
    {
        title : 'Linux 2/26-3/05',
        start : '2019-03-10',
        end : '2019-03-05'
    },
    {
      title    : 'Need to Do F-stuff',
      start    : '2019-04-20',
      end      : '2019-04-27',
      cssClass : 'family'
    },
    {
      title : 'Application exec',
      start : '2019-02-26',
      end : '2019-03-02',
      cssClass : ['home', 'work']
    },
  ];
export default {
	data () {
		return {
            name:'Ok !!',
            fcEvents : demoEvents
        }
	},
    methods : {
    'changeMonth' (start, end, current) {
      console.log('changeMonth', start.format(), end.format(), current.format())
    },
    'eventClick' (event, jsEvent, pos) {
       console.log('eventClick', event, jsEvent, pos)
    },
    'dayClick' (day, jsEvent) {
      console.log('dayClick', day, jsEvent)
    },
    'moreClick' (day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    }
  },
  components : {
	'full-calendar': require('vue-fullcalendar')	
  }
}

</script>

<style>
.app{
    color:green;
  }

</style>
