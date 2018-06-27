<template>
    <div class="max-width-929">
        <div ref="script"></div>
        <gl-title message="活動"></gl-title>
        <div class="gantt-target"></div>
    </div>
</template>

<script>
    import GlTitle from "./title";
    export default {
        components: {GlTitle},
        commponents: {},
        name: 'gl-gantt-chart',
        data() {
            return {
                carousel: null
            }
        }, methods:{


        }, created: function () {
            this.$nextTick(function(){
                let dom = this.$refs.script;
                let script = document.createElement('script');
                script.setAttribute("type", "text/javascript");
                script.async;
                script.src = "/common/lib/frappe-gantt.min.js";
                dom.appendChild(script);

                var link = document.createElement("link");

                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = "/common/lib/frappe-gantt.css";

                document.head.appendChild(link);

                var tasks = [
                    {
                        start: '2018-5-23',
                        end: '2018-5-40',
                        name: 'Redesign website',
                        id: "Task 0",
                        progress: 20
                    }
                ]

                var gantt_chart = new Gantt(".gantt-target", tasks, {
                    on_click: function (task) {
                        //console.log(task);
                        return
                    },
                    on_date_change: function(task, start, end) {
                        //console.log(task, start, end);
                        return
                    },
                    on_progress_change: function(task, progress) {
                        //console.log(task, progress);
                        return
                    },
                    on_view_change: function(mode) {
                        //console.log(mode);
                        return
                    }
                });
                //console.log(gantt_chart);
                gantt_chart.change_view_mode('Day')
            });
        }
    }
</script>
