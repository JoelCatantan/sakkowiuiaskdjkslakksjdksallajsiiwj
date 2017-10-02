(function ( $ ) {
    $.fn.JoGrid = function(param, a) {
        $JoGrid.newGrid($.extend(param, {target: this.selector}));
    };

    $JoGrid = {};

    $JoGrid.gridData = [];
    $JoGrid.hasAjax = null;
    $JoGrid.manipulateGrid = function(param) {
        var index = param.index;
        delete param.index;
        $.extend($JoGrid.gridData[index], param);
        $JoGrid.generateGrid($JoGrid.gridData[index], index);
    };

    $JoGrid.newGrid = function(param) {
        var index = $JoGrid.gridData.length;
        $JoGrid.gridData[index] = $.extend({
            /* TRUE, Last button in pagination will not showing */
            hideLastButton: false,
            /* Default class of the table */
            tableClass: 'table table-bordered table-hover',
            /* TRUE, First button must will not showing */
            hideFirstButton: false,
            /* TRUE, number segments in pagination will not showing */
            hideSegments: false,
            /* TRUE, top pagination must show */
            topBar : false,
            /* TRUE, bottom pagination must show */
            bottomBar : true,
            /* Closing element */
            opening : '',
            /* Closing element */
            closing : '',
            /* Target element where table must be rendered */
            target : '',
            /* Number of segment before and after the current page */
            numSegment : 5,
            /* Form Tag where search input is located */
            searchForm : '',
            /* Url that ajax is requesting */
            url : '',
            /* List of column in table */
            columns : {},
            /* TRUE, list count in first column must shown */
            count : true,
            /* Table name that will be sorted (ORDER BY Clause)*/
            sort : '',
            /* Sort orderly Asc/Desc (ORDER BY Clause) */
            order : '',
            /* Offset of list (LIMIT Clause) */
            offset : 0,
            /* LIMIT of list (LIMIT Clause) */
            limit : 30,
            /* Label of Previous button */
            previousLabel : 'Prev',
            /* Label of Next button */
            nextLabel : 'Next',
            /* Label of First button */
            firstLabel : 'First',
            /* Label of Last button */
            lastLabel : 'Last',
            /* Loading image */
            loading : '<div class="jogrid-ajax-loading"><div><span></span><label>Loading</label></div></div>',
            /* Execute if rendiring is complete */
            complete : function(){},
        }, param);

        $(param.target)
            .append($JoGrid.gridData[index].loading)
            .css({'position':'relative'});

        $(param.target).append($JoGrid.gridData[index].loading);

        $JoGrid.generateGrid($JoGrid.gridData[index], index);

        if($JoGrid.gridData[index].searchForm != '') {
            $('[jogrid-search-form="'+ $JoGrid.gridData[index].searchForm +'"]').on('submit', function(e) {
                e.preventDefault();
                var index;
                for(var i = 0; i < $JoGrid.gridData.length, typeof index == 'undefined'; i++) {
                    if($JoGrid.gridData[i].searchForm == $(this).attr('jogrid-search-form')) {
                        index = i;
                        break;
                    }
                }
                $.extend($JoGrid.gridData[index], {
                    offset : 0,
                });
                $JoGrid.generateGrid($JoGrid.gridData[index], index);
            });
        }
    };

    $JoGrid.generateGrid = function(opt, index) {
        var dData = [];
        ajaxRequest();

        function ajaxRequest() {
            searchForm  = $('[jogrid-search-form="'+ opt.searchForm +'"]').serialize();
            searchForm += typeof opt.searchForm == 'string' ? '&' : '';
            searchForm += $.param({
                              offset : typeof opt.offset2 != 'undefined' ? opt.offset2 : opt.offset,
                              limit : typeof opt.limit2 != 'undefined' ? opt.limit2 : opt.limit,
                              sort : typeof opt.sort2 != 'undefined' ? opt.sort2 : opt.sort,
                              order : typeof opt.order2 != 'undefined' ? opt.order2 : opt.order,
                          });

            $JoGrid.hasAjax = $.ajax({
                url : opt.url,
                data : searchForm,
                type : 'post',
                dataType : 'json',
                beforeSend: function() {
                    if($JoGrid.hasAjax != null) {
                        $JoGrid.hasAjax.abort();
                    }

                    $(opt.target +' div[data-jogrid]').append(opt.loading);
                },
                success: function(r) {
                    dData = r;
                    $(opt.target).html(generate()).promise().done(function(){
                        opt.complete();
                    });
                }
            });
        }

        function generate() {
            e = '<div class="table-responsive"><table class="'+ opt.tableClass +'">';
                e += '<thead>';
                    e += gen_th();
                e += '</thead>';
                e += '<tbody>';
                    e += get_td();
                e += '</tbody>';
            e += '</table></div>';

            b = opt.topBar == true || opt.bottomBar == true ? barControl() : '';

            return opt.opening
                    + '<div data-jogrid>'
                    + (opt.topBar == true ? b : '')
                    + e
                    + (opt.bottomBar == true ? b : '')
                    + '</div>'
                    + opt.closing;
        }

        function barControl() {

            if (dData.total <= opt.limit) {
                return '';
            }

            /* METHOD variables */
            var c = '',                                 /* string contains of html/pagination tags */
                offs,                                   /* offset value that will be suppied to the button fist/next/previos/last */
                limit = opt.limit,
                offset = opt.offset;

            /* PAGINATION variables */
            var cSegment = (offset / limit) + 1,        /* current segment */
                counter = 1,                            /* limiting the number of segments in pagination */
                p = '<li class="active"><a href="javascript:void(0)">'+ cSegment +'</a></li>',    /* string contains of html/pagination segments */
                numSegment = 5;

            c  = '<div id="jogrid-action-bar"><ul class="pagination">';

            /* First button */
            if (cSegment-1 > numSegment && opt.hideFirstButton == false) {
                c += "<li><a href=\"javascript:void(0)\" title=\"Next\" ";
                c += "onclick=\"$JoGrid.manipulateGrid({index:'"+index+"',offset:'0'})\">";
                c += opt.firstLabel +"</a></li>";
            }

            /* Previous button */
            if ((offs = parseFloat(offset) - parseFloat(limit)) >= 0) {
                c += "<li><a href=\"javascript:void(0)\" title=\"Previous\" ";
                c += "onclick=\"$JoGrid.manipulateGrid({index:'"+index+"',offset:'"+offs+"'})\">";
                c += opt.previousLabel +"</a></li>";
            }

            if(opt.hideSegments == false) {
                /* PAGINATION SEGMENTS */
                do {
                    if (((cSegment - 1) + counter) * limit <= (dData.total - 1)) {
                        p += "<li><a href=\"javascript:void(0)\" onclick=\"$JoGrid.manipulateGrid({index:'"+index+"',";
                        p += "offset:"+(((cSegment - 1) + counter) * limit)+"})\">"+(cSegment + counter)+'</a></li>';
                    }

                    if (((cSegment - 1) - counter) * limit >= 0) {
                        p = "offset:"+(((cSegment - 1) - counter) * limit)+"})\">"+(cSegment - counter)+'</a></li>' + p;
                        p = "<li><a href=\"javascript:void(0)\" onclick=\"$JoGrid.manipulateGrid({index:'"+index+"'," + p;
                    }

                    counter++;
                } while(counter <= numSegment);

                c += p;
            }

            /* Next button */
            if ((offs = parseFloat(offset) + parseFloat(limit)) < dData.total) {
                c += "<li><a href=\"javascript:void(0)\" title=\"Next\" ";
                c += "onclick=\"$JoGrid.manipulateGrid({index:'"+index+"',";
                c += "offset:'"+offs+"'})\">";
                c += opt.nextLabel +"</a></li>";
            }

            /* LAST button */
            if (((dData.total / limit) - (dData.total % limit)) - (cSegment-1) > numSegment && opt.hideLastButton == false) {
                c += '<li><a href="javascript:void(0)" title="Next" ';
                c += "onclick=\"$JoGrid.manipulateGrid({index:'"+index+"',";
                c += "offset:'"+((dData.total - 1) - ((dData.total - 1) % limit))+"'})\">";
                c += opt.lastLabel +"</a></li>";
            }

            c += '</ul></div>';

            return c;
        }

        function get_td() {
            var td = '', count = opt.offset;

            if (dData.total == 0) {
                count = opt.count == true ? 1 : 0;

                $.each(opt.columns, function(indexColumns, columns) {
                    count++;
                });

                td += '<tr>';
                td += '<td colspan="'+ count +'" class="no-result">';
                td += '- No result -';
                td += '</td>';
                td += '</tr>';

                return td;
            }

            $.each(dData.data, function(indexData, data) {
                td += '<tr>';

                if (opt.count == true) {
                    count++;
                    td += '<td><strong>'+ (count) +'</strong></td>';
                }

                $.each(opt.columns, function(indexColumns, columns) {
                    $.each(data, function(indexData2, data2) {
                        if(indexColumns == indexData2) {
                            td += '<td>'+ data2 +'</td>';
                            return false;
                        }
                    });
                });

                td += '</tr>';
            });

            return td;
        }

        function gen_th(v) {
            var th = '<tr>';

            if (opt.count == true) {
                th += '<th><span><strong>#</strong></span></th>'
            }

            $.each(opt.columns, function(k, v) {
                th += '<th';
                th += typeof v.style != "undefined" && v.style != ''? ' style="' + v.style + '"' : '';
                th += typeof v.attr  != "undefined"? ' ' + v.attr : '';
                th += '>';

                var sortable = typeof v.sortable != 'undefined' && v.sortable == true;

                if (sortable == true) {
                    var o = "index:'"+index+"',sort:'"+ k.trim() +"',order:'"+(opt.sort == k && opt.order == 'asc' ? 'desc' : 'asc')+"'";
                    th += '<a href="javascript:void(0)" onclick="$JoGrid.manipulateGrid({'+o+'})">';
                }

                th += '<span>'+ v.name +'</span>';

                if(sortable == true) {
                    th += '<i class="jogrid-icon jogrid-icon-';
                    th += opt.sort == k ? ( opt.order == 'asc' ? 'asc' : 'desc' ) : 'unsorted';
                    th += '"></i>';
                    th += '</a>';
                }

                th += '</th>';
            });

            return th + '</tr>';
        }
    };
}( jQuery ));
