//base_path = 'https://faultan.ru/wp-content/themes/neve/my/circuit/';
base_path = 'src/'

//base_uri = 'https://toe-flask.herokuapp.com/';
//base_uri = 'https://voronov.pythonanywhere.com/'
base_uri = 'http://127.0.0.1:5000/'

mxClient.link('stylesheet', base_path + 'css/style.css');

dictionary = {
    ru: {
        browser_error: 'Браузер не поддерживается!',
        undo_button: 'Отмена',
        delete_button: 'Удалить',
        calculate_button: 'Расчёт',
        meg_alert: 'Выберите ветвь, для которой необходимо рассчитать ток. Для этого пролистайте экран ниже, нажмите кнопку "Определить ветви" и выберите из списка нужную ветвь.',
        server_error: 'Нет связи с сервером. Расчёт невозможен.',
        select_item: 'Выберите элемент',
        num: 'Номер элемента',
        resistance: 'Сопротивление, Ом',
        capacitance: 'Ёмкость, Ф',
        inductance: 'Индуктивность, Гн',
        impedance: 'Сопротивление, Ом',
        peak: 'Амплитудное значение',
        phase: 'Начальная фаза, °',
        freq: 'Частота, Гц',
        demo_state: 'Внимание! Программа находится в демо-режиме и позволяет производить расчёт электрических цепей, где есть не более 3 элементов. Для расчёта сложных цепей необходимо оплатить подписку: https://faultan.ru/circuit_price/',
        subscribe_message: '<p>Для получения полного расчёта сложной электрической цепи, где более 3 элементов, оплатите <a href="https://faultan.ru/circuit_price/">подписку</a>.</p>',
        subscribe_notification: '<p>Если вы оплатили подписку, но доступ к расчёту не открылся, то обновите страницу.</p>',
        calc_finished: 'Расчёт завершён. На схеме отображены обозначения узлов и токов. Расчёт приведён ниже.',
        calc_finished_meg: 'Расчёт завершён. На схеме отображён искомый ток. Расчёт приведён ниже.',
        node_number: ' у.',
        rotate: 'Повернуть',
        vector_current: 'Векторная диаграмма токов',
        vector_voltage: 'Векторная диаграмма напряжений',
        vector_current_checkbox: '<p>Узлы, для которых отображаются векторные диаграммы тока:</br>',
        vector_voltage_checkbox: '<p>Контуры, для которых отображаются векторные диаграммы напряжений:</br>',
        loop_number: ' к.',
        demo_example: 'Загрузить демонстрационный пример?',
        demo_message: 'Выберите метод расчёта и нажмите кнопку "Расчёт"',
    },
    en: {
        browser_error: 'Browser is not supported!',
        undo_button: 'Undo',
        delete_button: 'Delete',
        calculate_button: 'Calc.',
        meg_alert: '',
        server_error: 'No connection with server. Calculation impossible.',
        select_item: 'Select element',
        num: 'Element number',
        resistance: 'Resistance, Ohm',
        capacitance: 'Capacity, F',
        inductance: 'Inductance, H',
        impedance: 'Impedance, Ohm',
        peak: 'Peak value',
        phase: 'Initial phase, °',
        freq: 'Frequency, Hz',
        demo_state: 'Attention! The program is in demo mode and allows you to calculate electrical circuits where there are no more than 3 elements. To calculate complex electrical circuit you need to subscribe: https://faultan.ru/en/circuit_price_en/',
        subscribe_message: '<p>To calculate electrical circuits where there are  more than 3 elements, you need to <a href="https://faultan.ru/en/circuit_price_en/">subscribe</a>.</p>',
        subscribe_notification: '<p>If you paid for the subscription, but access to the calculation did not open, then refresh the page.</p>',
        calc_finished: 'The calculation is completed. The diagram shows the designations of nodes and currents. The calculation is shown below.',
        calc_finished_meg: 'The calculation is completed. The diagram shows the desired current. The calculation is shown below.',
        node_number: ' n.',
        rotate: 'Rotate',
        vector_current: 'Current vector diagram',
        vector_voltage: 'Voltage vector diagram',
        vector_current_checkbox: '<p>Nodes for which current vector diagrams are displayed:</br>',
        vector_voltage_checkbox: '<p>Contours for which voltage vector diagrams are displayed:</br>',
        loop_number: ' loop',
        demo_example: 'Download demo example?',
        demo_message: 'Choose calculation method and push "Calc." button',
    },
}

if (lang == 'ru') {
    translator = dictionary.ru;
}
else if (lang == 'en') {
    translator = dictionary.en;
}
else {
    translator = dictionary.ru;
}

// If connect preview is not moved away then getCellAt is used to detect the cell under
// the mouse if the mouse is over the preview shape in IE (no event transparency), ie.
// the built-in hit-detection of the HTML document will not be used in this case.
mxConnectionHandler.prototype.movePreviewAway = false;
mxConnectionHandler.prototype.waypointsEnabled = true;
mxGraph.prototype.resetEdgesOnConnect = false;
mxConstants.SHADOWCOLOR = 'None';
var joinNodeSize = 5; // толщина узла
var strokeWidth = 2; // толщина линий

// Enables guides
mxGraphHandler.prototype.guidesEnabled = true;

// Enables rotation handle
mxVertexHandler.prototype.rotationEnabled = true;
mxVertexHandler.prototype.handleImage = base_path + '/images/rotate.gif'

// Alt disables guides
mxGuide.prototype.isEnabledForEvent = function(evt)
{
    return !mxEvent.isAltDown(evt);
};

// Enables snapping waypoints to terminals
mxEdgeHandler.prototype.snapToTerminals = true;

// Проверка ширины и высоты экрана
// если пользователь заходит с мобильного устройства, то необходимо добавлять тултипы
width = screen.width;
height = screen.height;
is_mobile = mxClient.IS_TOUCH || ((navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && (width < 760 && height < 760));
mxClient.IS_POINTER = true;


// Updates connection points before the routing is called.
// Computes the position of edge to edge connection points.
mxGraphView.prototype.updateFixedTerminalPoint = function(edge, terminal, source, constraint)
{
    var pt = null;

    if (constraint != null)
    {
        pt = this.graph.getConnectionPoint(terminal, constraint);
    }

    if (source)
    {
        edge.sourceSegment = null;
    }
    else
    {
        edge.targetSegment = null;
    }

    if (pt == null)
    {
        var s = this.scale;
        var tr = this.translate;
        var orig = edge.origin;
        var geo = this.graph.getCellGeometry(edge.cell);
        pt = geo.getTerminalPoint(source);

        // Computes edge-to-edge connection point
        if (pt != null)
        {
            pt = new mxPoint(s * (tr.x + pt.x + orig.x),
                             s * (tr.y + pt.y + orig.y));

            // Finds nearest segment on edge and computes intersection
            if (terminal != null && terminal.absolutePoints != null)
            {
                var seg = mxUtils.findNearestSegment(terminal, pt.x, pt.y);

                // Finds orientation of the segment
                var p0 = terminal.absolutePoints[seg];
                var pe = terminal.absolutePoints[seg + 1];
                var horizontal = (p0.x - pe.x == 0);

                // Stores the segment in the edge state
                var key = (source) ? 'sourceConstraint' : 'targetConstraint';
                var value = (horizontal) ? 'horizontal' : 'vertical';
                edge.style[key] = value;

                // Keeps the coordinate within the segment bounds
                if (horizontal)
                {
                    pt.x = p0.x;
                    pt.y = Math.min(pt.y, Math.max(p0.y, pe.y));
                    pt.y = Math.max(pt.y, Math.min(p0.y, pe.y));
                }
                else
                {
                    pt.y = p0.y;
                    pt.x = Math.min(pt.x, Math.max(p0.x, pe.x));
                    pt.x = Math.max(pt.x, Math.min(p0.x, pe.x));
                }
            }
        }
        // Computes constraint connection points on vertices and ports
        else if (terminal != null && terminal.cell.geometry.relative)
        {
            pt = new mxPoint(this.getRoutingCenterX(terminal),
                this.getRoutingCenterY(terminal));
        }

    }

    edge.setAbsoluteTerminalPoint(pt, source);
};

// Overrides methods to preview and create new edges.

// Sets source terminal point for edge-to-edge connections.
mxConnectionHandler.prototype.createEdgeState = function(me)
{
    // console.log('[DBG] createEdgeState called; sourceConstraint=', this.sourceConstraint, ' previous=', this.previous);
    var edge = this.graph.createEdge();
    if (!edge.geometry) {
        edge.geometry = new mxGeometry();
    }   
    edge.style = 'edgeStyle=wireEdgeStyle;shape=connector;rounded=0;endArrow=block;';
    if (this.sourceConstraint != null && this.previous != null)
    {
        edge.style = mxConstants.STYLE_EXIT_X+'='+this.sourceConstraint.point.x+';'+
            mxConstants.STYLE_EXIT_Y+'='+this.sourceConstraint.point.y+';';
    }
    else if (this.graph.model.isEdge(me.getCell()))
    {
        var scale = this.graph.view.scale;
        var tr = this.graph.view.translate;
        var pt = new mxPoint(this.graph.snap(me.getGraphX() / scale) - tr.x,
                this.graph.snap(me.getGraphY() / scale) - tr.y);
        edge.geometry.setTerminalPoint(pt, true);
    }

    return this.graph.view.createState(edge);
};

// Uses right mouse button to create edges on background (see also: lines 67 ff)
// Линия достраивается, когда производится двойное нажатие мыши либо нажатие правой клавишей мыши
prev_timestamp = 0;
mxConnectionHandler.prototype.isStopEvent = function(me)
{
    // console.log('[DBG] isStopEvent called; event=', me.getEvent().type);
     
    is_dblclick = false;
    if (me.getEvent().timeStamp - prev_timestamp < 300) {
        is_dblclick = true;
    }
    prev_timestamp = me.getEvent().timeStamp;

    return me.getState() != null || mxEvent.isRightMouseButton(me.getEvent()) || is_dblclick;
};

// Updates target terminal point for edge-to-edge connections.
mxConnectionHandlerUpdateCurrentState = mxConnectionHandler.prototype.updateCurrentState;
mxConnectionHandler.prototype.updateCurrentState = function(me)
{
    //  console.log('[DBG] updateCurrentState called; currentState=', this.currentState && this.currentState.cell.id);
    mxConnectionHandlerUpdateCurrentState.apply(this, arguments);

    if (this.edgeState != null)
    {
        // console.log('[DBG]   edgeState exists; adjusting terminal point');
        this.edgeState.cell.geometry.setTerminalPoint(null, false);

        if (this.shape != null && this.currentState != null &&
            this.currentState.view.graph.model.isEdge(this.currentState.cell))
        {
            var scale = this.graph.view.scale;
            var tr = this.graph.view.translate;
            var pt = new mxPoint(this.graph.snap(me.getGraphX() / scale) - tr.x,
                    this.graph.snap(me.getGraphY() / scale) - tr.y);
            this.edgeState.cell.geometry.setTerminalPoint(pt, false);
        }
    }
};

// Updates the terminal and control points in the cloned preview.
// mxEdgeSegmentHandler.prototype.clonePreviewState = function(point, terminal)
// {
//     var clone = mxEdgeHandler.prototype.clonePreviewState.apply(this, arguments);
//     clone.cell = clone.cell.clone();

//     if (this.isSource || this.isTarget)
//     {
//         clone.cell.geometry = clone.cell.geometry.clone();

//         // Sets the terminal point of an edge if we're moving one of the endpoints
//         if (this.graph.getModel().isEdge(clone.cell))
//         {
//             // TODO: Only set this if the target or source terminal is an edge
//             clone.cell.geometry.setTerminalPoint(point, this.isSource);
//         }
//         else
//         {
//             clone.cell.geometry.setTerminalPoint(null, this.isSource);
//         }
//     }

//     return clone;
// };

var mxEdgeHandlerConnect = mxEdgeHandler.prototype.connect;
mxEdgeHandler.prototype.connect = function(edge, terminal, isSource, isClone, me)
{
    // console.log('[DBG] edgeHandler.connect called; edge=', edge, ' terminal=', terminal, ' isSource=', isSource);
    var result = null;
    var model = this.graph.getModel();
    var parent = model.getParent(edge);

    model.beginUpdate();
    try
    {
        result = mxEdgeHandlerConnect.apply(this, arguments);
        var geo = model.getGeometry(result);

        if (geo != null)
        {
            geo = geo.clone();
            var pt = null;

            if (model.isEdge(terminal))
            {
                pt = this.abspoints[(this.isSource) ? 0 : this.abspoints.length - 1];
                pt.x = pt.x / this.graph.view.scale - this.graph.view.translate.x;
                pt.y = pt.y / this.graph.view.scale - this.graph.view.translate.y;

                var pstate = this.graph.getView().getState(
                        this.graph.getModel().getParent(edge));

                if (pstate != null)
                {
                    pt.x -= pstate.origin.x;
                    pt.y -= pstate.origin.y;
                }

                pt.x -= this.graph.panDx / this.graph.view.scale;
                pt.y -= this.graph.panDy / this.graph.view.scale;
            }

            geo.setTerminalPoint(pt, isSource);
            model.setGeometry(edge, geo);
        }
    }
    finally
    {
        model.endUpdate();
    }

    return result;
};


// Adds in-place highlighting for complete cell area (no hotspot).
mxConnectionHandlerCreateMarker = mxConnectionHandler.prototype.createMarker;
mxConnectionHandler.prototype.createMarker = function()
{
    var marker = mxConnectionHandlerCreateMarker.apply(this, arguments);

    // Uses complete area of cell for new connections (no hotspot)
    marker.intersects = function(state, evt)
    {
        return true;
    };

    // Adds in-place highlighting
    mxCellHighlightHighlight = mxCellHighlight.prototype.highlight;
    marker.highlight.highlight = function(state)
    {
        //  console.log('[LOG] HIGHLIGHT TRIGGERED', state); // Добавляем лог
        if (this.state != state)
        {
            if (this.state != null)
            {
                this.state.style = this.lastStyle;

                // Workaround for shape using current stroke width if no strokewidth defined
                this.state.style['strokeWidth'] = this.state.style['strokeWidth'] || '1';
                this.state.style['strokeColor'] = this.state.style['strokeColor'] || 'none';

                if (this.state.shape != null)
                {
                    this.state.view.graph.cellRenderer.configureShape(this.state);
                    this.state.shape.redraw();
                }
            }

            if (state != null)
            {
                this.lastStyle = state.style;
                state.style = mxUtils.clone(state.style);
                state.style['strokeColor'] = '#00ff00';
                state.style['strokeWidth'] = '3';

                if (state.shape != null)
                {
                    state.view.graph.cellRenderer.configureShape(state);
                    state.shape.redraw();
                }
            }

            this.state = state;
        }
    };

    return marker;
};

mxEdgeHandlerCreateMarker = mxEdgeHandler.prototype.createMarker;
mxEdgeHandler.prototype.createMarker = function()
{
    var marker = mxEdgeHandlerCreateMarker.apply(this, arguments);

    // Adds in-place highlighting when reconnecting existing edges
    marker.highlight.highlight = this.graph.connectionHandler.marker.highlight.highlight;

    return marker;
}

// Adds oval markers for edge-to-edge connections.
mxGraphGetCellStyle = mxGraph.prototype.getCellStyle;
mxGraph.prototype.getCellStyle = function(cell)
{
    var style = mxGraphGetCellStyle.apply(this, arguments);

    if (style != null && this.model.isEdge(cell))
    {
        style = mxUtils.clone(style);

        if (this.model.isEdge(this.model.getTerminal(cell, true)))
        {
            style['startArrow'] = 'oval';
        }

        if (this.model.isEdge(this.model.getTerminal(cell, false)))
        {
            style['endArrow'] = 'oval';
        }
    }

    return style;
};

// метод для формирования точек перегиба соединительной линии
mxEdgeStyle.WireConnector = function(state, source, target, hints, result)
{
    // Creates array of all way- and terminalpoints
    var pts = state.absolutePoints;
    var horizontal = true;
    var hint = null;

    // Gets the initial connection from the source terminal or edge
    if (source != null && state.view.graph.model.isEdge(source.cell))
    {
        horizontal = state.style['sourceConstraint'] == 'horizontal';
    }
    else if (source != null)
    {
        horizontal = source.style['portConstraint'] != 'vertical';

        // Checks the direction of the shape and rotates
        var direction = source.style[mxConstants.STYLE_DIRECTION];

        if (direction == 'north' || direction == 'south')
        {
            horizontal = !horizontal;
        }
    }

    // Adds the first point
    // TODO: Should move along connected segment
    var pt = pts[0];

    if (pt == null && source != null)
    {
        pt = new mxPoint(state.view.getRoutingCenterX(source), state.view.getRoutingCenterY(source));
    }
    else if (pt != null)
    {
        pt = pt.clone();
    }

    var first = pt;

    // Adds the waypoints
    if (hints != null && hints.length > 0)
    {
        for (var i = 0; i < hints.length; i++)
        {
            horizontal = !horizontal;
            hint = state.view.transformControlPoint(state, hints[i]);

            if (horizontal)
            {
                if (pt.y != hint.y)
                {
                    pt.y = hint.y;
                    result.push(pt.clone());
                }
            }
            else if (pt.x != hint.x)
            {
                pt.x = hint.x;
                result.push(pt.clone());
            }
        }
    }
    else
    {
        hint = pt;
    }

    // Adds the last point
    pt = pts[pts.length - 1];

    // TODO: Should move along connected segment
    if (pt == null && target != null)
    {
        pt = new mxPoint(state.view.getRoutingCenterX(target), state.view.getRoutingCenterY(target));
    }

    if (horizontal)
    {
        if (pt.y != hint.y && first.x != pt.x)
        {
            result.push(new mxPoint(pt.x, hint.y));
        }
    }
    else if (pt.x != hint.x && first.y != pt.y)
    {
        result.push(new mxPoint(hint.x, pt.y));
    }
};

mxStyleRegistry.putValue('wireEdgeStyle', mxEdgeStyle.WireConnector);

// This connector needs an mxEdgeSegmentHandler
mxGraphCreateHandler = mxGraph.prototype.createHandler;
mxGraph.prototype.createHandler = function(state)
{
    var result = null;

    if (state != null)
    {
        if (this.model.isEdge(state.cell))
        {
            var style = this.view.getEdgeStyle(state);

            if (style == mxEdgeStyle.WireConnector)
            {
                return new mxEdgeSegmentHandler(state);
            }
        }
    }

    return mxGraphCreateHandler.apply(this, arguments);
};


function disp_result(xhr, graph, data, flag, method) {
    document.getElementById("result").innerHTML = '';
    document.getElementById('vector_i').innerHTML = '';
    document.getElementById('vector_i_checkboxes').innerHTML = '';
    document.getElementById('vector_u').innerHTML = '';
    document.getElementById('vector_u_checkboxes').innerHTML = '';
    response = JSON.parse(xhr.response);
    if (response['result'] == 'success') {
        let message = response['message'];
        if (!flag && message.length < 300) {
            message = message + '...</p>' + translator.subscribe_message;
//            if (lang == 'ru') {
//                message += '<p>Успейте оформить подписку со <a href="https://faultan.ru/circuit_sale/">скидкой</a>!</p>'
//            }
            message += translator.subscribe_notification;
        }
        document.getElementById("result").innerHTML = message;
        if (method != 3) {
            alert(translator.calc_finished)
            disp_node_numbers(graph, response['vertex']);
            vector(response['vector']);
        }
        else if (method == 3) {
            disp_eqv_gen_scheme(graph, response['changes']);
            disp_node_numbers(graph, response['vertex']);
            alert(translator.calc_finished_meg)

        }
    }
    else {
        alert(response['message']);
    }
    renderMathInElement(document.body, {});
}

function delete_arrow_nodes(graph) {
    // Производится удаление номеров узлов и токов из схемы
    var parent = graph.getDefaultParent();
    var model = graph.getModel();
    model.beginUpdate();

    try {
        for (i in model.cells) {
            if (model.cells[i].edge) {
                }
            else {
                if (model.cells[i].style == null && Number(model.cells[i].id) > 1) {
                    graph.removeCells([model.cells[i]]);
                    continue;
                }
                if (model.cells[i].style != null) {
                    if (model.cells[i].style.indexOf('arrow') != -1) {
                        graph.removeCells([model.cells[i]]);
                    }
                }
            }
        }
    }
    finally
    {
        graph.getModel().endUpdate();
    }
}

function disp_node_numbers(graph, vertex) {
    delete_arrow_nodes(graph);
    // Производится добавление номеров узлов и токов на схему
    if (vertex) {
        var parent = graph.getDefaultParent();
        var model = graph.getModel();
        model.beginUpdate();
        try {
            if (vertex['nodes'].length > 0) {
                for (i = 0; i < vertex['nodes'].length; i++) {
                    v = graph.insertVertex(parent, null, vertex['nodes'][i]['number'] + translator.node_number, Number(vertex['nodes'][i]['node'][0]) + 10,
                    Number(vertex['nodes'][i]['node'][1]) + 10, 0, 0);
                    v.setConnectable(false);
                }
            }
            if (vertex['currents'].length > 0) {
                for (i = 0; i < vertex['currents'].length; i++) {
                    v = graph.insertVertex(parent, null, 'I' + vertex['currents'][i]['num'], vertex['currents'][i]['x'],
                    vertex['currents'][i]['y'], 10, 8,
                    'shape=arrow;' + 'verticalLabelPosition=' + vertex['currents'][i]['vlp'] +
                    ';labelPosition=' + vertex['currents'][i]['lp'] + ';direction=' + vertex['currents'][i]['dir'] + ';');
                    v.setConnectable(false);
                }
            }
        }
        finally
        {
            graph.getModel().endUpdate();
        }
    }
//
//    document.getElementById('schema').innerHTML = '<svg style="left: 0px; top: 0px; width: 100%; height: 100%; display: block; min-width: 741px; min-height: 529px;"><g>' + graph.view.canvas.innerHTML + '</g></svg>';
//
//    var parent = graph.getDefaultParent();
//    var model = graph.getModel();
//    model.beginUpdate();
//
//    try {
//        for (i in model.cells) {
////            if (i > max_id + 1) {
////                graph.removeCells([model.cells[i]]);
////            }
////            if (Number(model.cells[i].id) == 29) {
////                graph.removeCells([model.cells[i]], false);
////                model.cells[i].setVisible(false);
////                model.cells[i].__proto__.visible = false;
////            }
//        }
////
//
////        graph.addCells([model_origin])
//
////        for (i in model_origin) {
////            if (model_origin[i].id > 1) {
////                graph.model.add(parent, model_origin[i], model_origin[i].id);
////            }
////        }
//    }
//    finally
//    {
//        graph.getModel().endUpdate();
//    }

//    undoManager.undo();

}

function disp_eqv_gen_scheme(graph, changes) {
    delete_arrow_nodes(graph);

    // Добавляем изображения токов и узлов
    if (changes) {
        if (changes['xx']['add']) {
            disp_node_numbers(graph, changes['xx']['add']);
        }

        // Удаляем элементы из ветви с искомым током
        var parent = graph.getDefaultParent();
        var model = graph.getModel();
        model.beginUpdate();

        try {
            for (i in model.cells) {
                id = model.cells[i].id;
                for (k in changes['xx']['delete']) {
                    if (changes['xx']['delete'][k] == id) {
                        graph.removeCells([model.cells[i]], false);
                    }
                }
            }

            graph.insertVertex(parent, null, changes['xx']['text']['text'], Number(changes['xx']['text']['x']) + 20, Number(changes['xx']['text']['y']) + 20, 0, 0);
        }
        finally
        {
            graph.getModel().endUpdate();
        }

        document.getElementById('schema_xx').innerHTML = '<svg style="left: 0px; top: 0px; width: 100%; height: 100%; display: block; min-width: 741px; min-height: 529px;"><g>' + graph.view.canvas.innerHTML + '</g></svg>';

        // Откатываем изменения для того, чтобы отображалась исходная схема
        if (changes['xx']['add']['currents'].length && changes['xx']['add']['nodes'].length) {
            undoManager.undo();
        }

        undoManager.undo();

        model.beginUpdate();

        try {
            for (i in model.cells) {
                id = model.cells[i].id;
                for (k in changes['xx']['delete']) {
                    if (changes['xx']['delete'][k] == id) {
                        graph.removeCells([model.cells[i]], false);
                    }
                }
                for (k in changes['z']['delete']) {
                    if (changes['z']['delete'][k] == id) {
                        graph.removeCells([model.cells[i]], false);
                    }
                }
            }
            for (k in changes['z']['add']) {
                graph.insertVertex(parent, null, '', changes['z']['add'][k]['x'], changes['z']['add'][k]['y'], 40, 40,
                'shape=line;direction=' + changes['z']['add'][k]['dir'] + ';');
            }

            graph.insertVertex(parent, null, changes['z']['text']['text'], Number(changes['z']['text']['x']) + 20, Number(changes['z']['text']['y']) + 20, 0, 0);
        }
        finally
        {
            graph.getModel().endUpdate();
        }

        if (document.getElementById('schema_z')) {
            document.getElementById('schema_z').innerHTML = '<svg style="left: 0px; top: 0px; width: 100%; height: 100%; display: block; min-width: 741px; min-height: 529px;"><g>' + graph.view.canvas.innerHTML + '</g></svg>';
        }

        undoManager.undo();

    }
}

function ResistorShape() {};
ResistorShape.prototype = new mxCylinder();
ResistorShape.prototype.constructor = ResistorShape;

ResistorShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
{
    var dx = w / 26;
    var dy = h / 7;

    if (isForeground)
    {
        path.moveTo(0, h / 2);
        path.lineTo(3 * dx, h / 2);
        path.lineTo(3 * dx, 6 * dy);
        path.lineTo(23 * dx, 6 * dy);
        path.moveTo(3 * dx, h / 2);
        path.lineTo(3 * dx, dy);
        path.lineTo(23 * dx, dy);
        path.lineTo(23 * dx, 6 * dy);
        path.moveTo(23 * dx, h / 2);
        path.lineTo(26 * dx, h / 2);
        path.end();
    }
};

mxCellRenderer.registerShape('resistor', ResistorShape);


function InductorShape() {};
InductorShape.prototype = new mxCylinder();
InductorShape.prototype.constructor = InductorShape;

InductorShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
{
    var dx = w / 18;

    if (isForeground)
    {
        path.moveTo(0, h / 2);
        path.lineTo(1.5 * dx, h / 2);
        path.curveTo(1.5 * dx, h / 2, 4 * dx, 0, 6.5 * dx, h / 2);
        path.curveTo(6.5 * dx, h / 2, 9 * dx, 0, 11.5 * dx, h / 2);
        path.curveTo(11.5 * dx, h / 2, 14 * dx, 0, 16.5 * dx, h / 2);
        path.lineTo(18 * dx, h / 2)
        path.end();
    }
};

mxCellRenderer.registerShape('inductor', InductorShape);


function CapacitorShape() {};
CapacitorShape.prototype = new mxCylinder();
CapacitorShape.prototype.constructor = CapacitorShape;

CapacitorShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
{
    var dx = w / 3;

    if (isForeground)
    {
        path.begin();
        path.moveTo(0, h / 2);
        path.lineTo(dx, h / 2);
        path.lineTo(dx, h);
        path.lineTo(dx, 0);
        path.moveTo(2 * dx, h);
        path.lineTo(2 * dx, 0);
        path.lineTo(2 * dx, h / 2);
        path.lineTo(3 * dx, h / 2);
        path.end();
    }
};
mxCellRenderer.registerShape('capacitor', CapacitorShape);


function VoltageShape() {};
VoltageShape.prototype = new mxCylinder();
VoltageShape.prototype.constructor = VoltageShape;

VoltageShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
{
    dx = w / 10;
    dy = h / 10;
    coor = calc_circle_points(w / 2, 10)
    if (isForeground)
    {
        path.moveTo(w / 2, h);
        for (let i = 0; i < coor['x_coor'].length; i++) {
            path.lineTo(coor['x_coor'][i], coor['y_coor'][i]);
        }
        path.moveTo(0, h / 2);
        path.lineTo(w, h / 2);
        path.moveTo(7 * dx, 4 * dy);
        path.lineTo(0.95 * w, h / 2);
        path.lineTo(7 * dx, 6 * dy);
        path.end();
    }
};
mxCellRenderer.registerShape('voltage', VoltageShape);

function CurrentShape() {};
CurrentShape.prototype = new mxCylinder();
CurrentShape.prototype.constructor = CurrentShape;

CurrentShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
{
    dx = w / 10;
    dy = h / 10;
    coor = calc_circle_points(w / 2, 10)
    if (isForeground)
    {
        path.moveTo(w / 2, h);
        for (let i = 0; i < coor['x_coor'].length; i++) {
            path.lineTo(coor['x_coor'][i], coor['y_coor'][i]);
        }

        path.moveTo(0, h / 2);
        path.lineTo(4.5 * dx, h / 2);
        path.moveTo(3.5 * dx, 7.5 * dy);
        path.lineTo(4.5 * dx, h / 2);
        path.lineTo(3.5 * dx, 2.5 * dy);
        path.moveTo(w, h / 2);
        path.lineTo(6.5 * dx, h / 2);
        path.moveTo(5.5 * dx, 2.5 * dy);
        path.lineTo(6.5 * dx, h / 2);
        path.lineTo(5.5 * dx, 7.5 * dy);
        path.end();
    }
};
mxCellRenderer.registerShape('current', CurrentShape);


function ArrowShape() {};
ArrowShape.prototype = new mxCylinder();
ArrowShape.prototype.constructor = ArrowShape;

ArrowShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
{
    dx = w / 10;
    dy = h / 10;
    if (isForeground)
    {
        path.moveTo(4 * dx, h);
        path.lineTo(w, h / 2);
        path.lineTo(4 * dx, 0);
        path.moveTo(0, h / 2);
        path.lineTo(w, h / 2);
        path.end();
    }
};
mxCellRenderer.registerShape('arrow', ArrowShape);


function calc_circle_points(r, d_phi) {
    let x_coor = [];
    let y_coor = [];
    let N = (370 / d_phi) + 1;

    for (let i = 0; i < N; i++) {
        x_coor.push(r * Math.sin(d_phi * i * Math.PI / 180) + r);
        y_coor.push(r * Math.cos(d_phi * i * Math.PI / 180) + r);
    }
    return {
        'x_coor': x_coor,
        'y_coor': y_coor
    }
}


function addToolbarItem(graph, toolbar, prototype, image)
{
    // // Function that is executed when the image is dropped on
    // // the graph. The cell argument points to the cell under
    // // the mousepointer if there is one.
    // var funct = function(graph, evt, cell)
    // {
    //     graph.stopEditing(false);

    //     var pt = graph.getPointForEvent(evt);
    //     var vertex = graph.getModel().cloneCell(prototype);
    //     vertex.geometry.x = pt.x;
    //     vertex.geometry.y = pt.y;

    //     graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
    // }

    // // Creates the image which is used as the drag icon (preview)
    // var img = toolbar.addMode(null, image, funct);
    // mxUtils.makeDraggable(img, graph, funct);
     // Поведение при дропе мышкой
    var funct = function(graph, evt, cell) {
        graph.stopEditing(false);
        
        var pt = graph.getPointForEvent(evt);
        

        var vertex = graph.getModel().cloneCell(prototype);
         console.log('Размер вершины:', vertex.geometry.width, vertex.geometry.height);
        vertex.geometry.x = pt.x;
        vertex.geometry.y = pt.y;

        graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
        
    };

    // Создаем элемент тулбара (с иконкой)
    var img = toolbar.addMode(null, image, funct);

    // Поддержка drag'n'drop
    mxUtils.makeDraggable(img, graph, funct);

    // === Поддержка мобильных устройств ===
    // Проверка: если тачскрин
    const isTouchDevice = is_mobile;

    if (isTouchDevice) {
        img.addEventListener('click', function(evt) {
           evt.preventDefault();
    evt.stopPropagation();

    graph.stopEditing(false);

    var view = graph.getView();
    var scale = view.scale;
    var tr = view.translate;

    var x = (graph.container.scrollLeft + graph.container.clientWidth / 2) / scale - tr.x;
    var y = (graph.container.scrollTop + graph.container.clientHeight / 2) / scale - tr.y;

    var vertex = graph.getModel().cloneCell(prototype);

    // Вычитаем половину размеров — сдвиг по центру
    x -= vertex.geometry.width / 2;
    y -= vertex.geometry.height / 2;

    vertex.geometry.x = x;
    vertex.geometry.y = y;

    graph.setSelectionCells(graph.importCells([vertex], 0, 0));
        });
        
    
    }


}

function create_toolbar(id, graph, base_path, calc_type) {
    var tbContainer = document.getElementById(id);

    // // Creates new toolbar without event processing
    var toolbar = new mxToolbar(tbContainer);
    toolbar.enabled = false

    // Workaround for Internet Explorer ignoring certain styles
    if (mxClient.IS_QUIRKS)
    {
        document.body.style.overflow = 'hidden';
        new mxDivResizer(tbContainer);
        // new mxDivResizer(container);
    }

    // Creates the model and the graph inside the container
    // using the fastest rendering available on the browser
    var model = new mxGraphModel();
    // var graph = new mxGraph(container, model);
    // graph.dropEnabled = true;

    // Matches DnD inside the graph
    mxDragSource.prototype.getDropTarget = function(graph, x, y)
    {
        var cell = graph.getCellAt(x, y);

        if (!graph.isValidDropTarget(cell))
        {
            cell = null;
        }

        return cell;
    };

    // Enables new connections in the graph
    graph.setConnectable(true);
    graph.setMultigraph(false);

    var addVertex = function(icon, w, h, style, value)
    {
        var vertex = new mxCell(value, new mxGeometry(0, 0, w, h), style);
        vertex.value.attributes = {1: 1}
        vertex.setVertex(true);

        addToolbarItem(graph, toolbar, vertex, icon);
    };

    var r = mxUtils.createXmlDocument().createElement('resistor');
    r.setAttribute('num', '?')
    r.setAttribute('resistance', '1');
    addVertex(base_path + 'images/resistor.gif', 52, 22, 'shape=resistor;verticalLabelPosition=top;labelPosition=center;', r);

    var c = mxUtils.createXmlDocument().createElement('capacitor');
    c.setAttribute('num', '?')
    if (calc_type == 0) {
        c.setAttribute('impedance', '1');
    }
    else {
        c.setAttribute('capacitance', '0.00001');
    }

    addVertex(base_path + 'images/capacitor.gif', 24, 40, 'shape=capacitor;verticalLabelPosition=top;labelPosition=center;', c);

    var l = mxUtils.createXmlDocument().createElement('inductor');
    l.setAttribute('num', '?')
    if (calc_type == 0) {
        l.setAttribute('impedance', '1');
    }
    else {
        l.setAttribute('inductance', '0.01');
    }

    addVertex(base_path + 'images/inductor.gif', 66, 32, 'shape=inductor;verticalLabelPosition=top;labelPosition=center;', l);

    var e = mxUtils.createXmlDocument().createElement('voltage');
    e.setAttribute('num', '?')
    e.setAttribute('peak', '100');
    e.setAttribute('phase', '0');
    // e.setAttribute('freq', '50');
    addVertex(base_path + 'images/voltage.gif', 40, 40, 'shape=voltage;verticalLabelPosition=top;labelPosition=center;', e);

    var j = mxUtils.createXmlDocument().createElement('current');
    j.setAttribute('num', '?')
    j.setAttribute('peak', '1');
    j.setAttribute('phase', '0');
    // j.setAttribute('freq', '50');
    addVertex(base_path + 'images/current.gif', 40, 40, 'shape=current;verticalLabelPosition=top;labelPosition=center;', j);
}

function change_elements(graph, calc_type) {
    cells = graph.model.cells;
    for (i in cells) {
        cell = cells[i];
        if (calc_type == 1) {
            try {
                if (cell.value.nodeName == 'capacitor') {
                    val = cell.getAttribute('impedance');
                    cell.value.attributes.removeNamedItem('impedance');
                    cell.setAttribute('capacitance', val);
                }
                if (cell.value.nodeName == 'inductor') {
                    val = cell.getAttribute('impedance');
                    cell.value.attributes.removeNamedItem('impedance');
                    cell.setAttribute('inductance', val);
                }
            }
            catch {
            }
        }
        if (calc_type == 0) {
            try {
                if (cell.value.nodeName == 'capacitor') {
                    val = cell.getAttribute('capacitance');
                    cell.value.attributes.removeNamedItem('capacitance');
                    cell.setAttribute('impedance', val);
                }
                if (cell.value.nodeName == 'inductor') {
                    val = cell.getAttribute('inductance');
                    cell.value.attributes.removeNamedItem('inductance');
                    cell.setAttribute('impedance', val);
                }
            }
            catch {
            }
        }
    }
}

function mxIconSet(state)
{
    this.images = [];

    // Иконка для поворота
    var img = mxUtils.createImage(base_path + 'images/rotate.gif');
    img.setAttribute('title', translator.rotate);
    img.style.position = 'absolute';
    img.style.cursor = 'pointer';
    img.style.width = '16px';
    img.style.height = '16px';
    img.style.left = (state.x + state.width) + 'px';
    img.style.top = (state.y - 16) + 'px';

    mxEvent.addGestureListeners(img,
        mxUtils.bind(this, function(evt)
        {
            var stroke = mxUtils.getValue(state.style, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE);
			var fill = mxUtils.getValue(state.style, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE);

			if (state.view.graph.model.isVertex(state.cell) && stroke == mxConstants.NONE && fill == mxConstants.NONE) {
				var angle = mxUtils.mod(mxUtils.getValue(state.style, mxConstants.STYLE_ROTATION, 0) + 90, 360);
				state.view.graph.setCellStyles(mxConstants.STYLE_ROTATION, angle, [state.cell]);
			}
			else {
				state.view.graph.turnShapes([state.cell]);
			}
                
             // пересоздаём стрелки для этой вершины после перерисовки
    setTimeout(() => {
      if (g._connectors) {
        g._connectors.showForCell(state.cell);
      }
    }, 0);


            mxEvent.consume(evt);
        })
    );


    state.view.graph.container.appendChild(img);
    this.images.push(img);

    // Иконка для удаления элемента
    var img = mxUtils.createImage(base_path + 'images/delete.png');
    img.setAttribute('title', translator.delete_button);
    img.style.position = 'absolute';
    img.style.cursor = 'pointer';
    img.style.width = '16px';
    img.style.height = '16px';
    img.style.left = (state.x + state.width) + 'px';
    img.style.top = (state.y + 38) + 'px';

    mxEvent.addGestureListeners(img,
        mxUtils.bind(this, function(evt) {
			mxEvent.consume(evt);
		})
	);

    mxEvent.addListener(img, 'click',
        mxUtils.bind(this, function(evt) {
            this.destroy();
            state.view.graph.removeCells([state.cell]);
            mxEvent.consume(evt);
        })
    );

    state.view.graph.container.appendChild(img);
    this.images.push(img);

};

mxIconSet.prototype.destroy = function()
{
    if (this.images != null)
    {
        for (var i = 0; i < this.images.length; i++)
        {
            var img = this.images[i];
            img.parentNode.removeChild(img);
        }
    }

    this.images = null;
};

mxGraph.prototype.turnShapes = function(cells, backwards)
{
    var model = this.getModel();
    var select = [];

    model.beginUpdate();
    try
    {
        for (var i = 0; i < cells.length; i++)
        {
            var cell = cells[i];

            if (model.isEdge(cell))
            {
                var src = model.getTerminal(cell, true);
                var trg = model.getTerminal(cell, false);

                model.setTerminal(cell, trg, true);
                model.setTerminal(cell, src, false);

                var geo = model.getGeometry(cell);

                if (geo != null)
                {
                    geo = geo.clone();

                    if (geo.points != null)
                    {
                        geo.points.reverse();
                    }

                    var sp = geo.getTerminalPoint(true);
                    var tp = geo.getTerminalPoint(false)

                    geo.setTerminalPoint(sp, false);
                    geo.setTerminalPoint(tp, true);
                    model.setGeometry(cell, geo);

                    // Inverts constraints
                    var edgeState = this.view.getState(cell);
                    var sourceState = this.view.getState(src);
                    var targetState = this.view.getState(trg);

                    if (edgeState != null)
                    {
                        var sc = (sourceState != null) ? this.getConnectionConstraint(edgeState, sourceState, true) : null;
                        var tc = (targetState != null) ? this.getConnectionConstraint(edgeState, targetState, false) : null;

                        this.setConnectionConstraint(cell, src, true, tc);
                        this.setConnectionConstraint(cell, trg, false, sc);
                    }

                    select.push(cell);
                }
            }
            else if (model.isVertex(cell))
            {
                var geo = this.getCellGeometry(cell);

                if (geo != null)
                {
                    // Rotates the size and position in the geometry
                    geo = geo.clone();
                    geo.x += geo.width / 2 - geo.height / 2;
                    geo.y += geo.height / 2 - geo.width / 2;
                    var tmp = geo.width;
                    geo.width = geo.height;
                    geo.height = tmp;
                    model.setGeometry(cell, geo);

                    // Reads the current direction and advances by 90 degrees
                    var state = this.view.getState(cell);

                    if (state != null)
                    {
                        var dirs = [mxConstants.DIRECTION_EAST, mxConstants.DIRECTION_SOUTH,
                            mxConstants.DIRECTION_WEST, mxConstants.DIRECTION_NORTH];
                        var dir = mxUtils.getValue(state.style, mxConstants.STYLE_DIRECTION,
                            mxConstants.DIRECTION_EAST);
                        var labPos = mxUtils.getValue(state.style, mxConstants.STYLE_LABEL_POSITION,
                                mxConstants.ALIGN_CENTER);
                        this.setCellStyles(mxConstants.STYLE_DIRECTION,
                            dirs[mxUtils.mod(mxUtils.indexOf(dirs, dir) +
                            ((backwards) ? -1 : 1), dirs.length)], [cell]);
                        if (labPos == mxConstants.ALIGN_CENTER) {
                            this.setCellStyles(mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_LEFT, [cell]);
                            this.setCellStyles(mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE, [cell]);
                        }
                        else {
                            this.setCellStyles(mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER, [cell]);
                            this.setCellStyles(mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_TOP, [cell]);
                        }

                    }

                    select.push(cell);
                }
            }
        }
    }
    finally
    {
        model.endUpdate();
    }

    return select;
};

function vector(data) {
    if (data['vector_i_data']) {
        if (data['vector_i_data'].length > 0) {
            vector_i_selector_creator(data['vector_i_data']);
            vector_i(data['vector_i_data']);
        }
    }
    if (data['vector_u_data']) {
        if (data['vector_u_data'].length > 0) {
            vector_u_selector_creator(data['vector_u_data']);
            vector_u(data['vector_u_data']);
        }
    }
}

function vector_i(data) {
    let data_plot = [];
    for (let i = 0; i < data.length; i++) {
        checkbox = document.getElementById('checkbox_i_' + i);
        if (checkbox.checked) {
            max_val = 0
            for (let j = 0; j < data[i].names.length; j++) {
                val = Math.sqrt(Math.pow(data[i].x[j], 2) + Math.pow(data[i].y[j], 2));
                if (val > max_val) {
                    max_val = val;
                }
            }
            for (let j = 0; j < data[i].names.length; j++) {
                if ((Math.abs(data[i].x[j]) > 0) || (Math.abs(data[i].y[j]) > 0)) {
                    arr = arrow(data[i].x[j], data[i].y[j], max_val);
                }
                else {
                    arr = [0, 0, 0, 0];
                }
                data_plot.push({
                    x: [0, data[i].x[j], arr[0], data[i].x[j], arr[2]],
                    y: [0, data[i].y[j], arr[1], data[i].y[j], arr[3]],
                    mode: 'lines+text',
                    text: ['', data[i].names[j]],
                    textfont: {
                        family: 'Arial, sans-serif;',
                        size: 12,
                    },
                    textposition: text_position(Math.atan2(data[i].y[j], data[i].x[j]) * 180 / Math.PI),
                    line: {
                        color: 'black',
                    },
                    type: 'scatter'
                })
            }
        }
    }

    let layout = {
        title: translator.vector_current,
        height: 500,
        showlegend: false,
        font: {
            family: 'Arial, sans-serif;',
            size: 10,
            color: '#000'
        },
        yaxis: {
            scaleanchor: "x",
        },
    }

    Plotly.newPlot('vector_i', data_plot, layout, {
        showLink: false,
        displaylogo: false,
        displayModeBar: false,
    });

}

function vector_u(data) {
    let data_plot = [];
    for (let i = 0; i < data.length; i++) {
        checkbox = document.getElementById('checkbox_u_' + i);
        if (checkbox.checked) {
            max_val = 0
            for (let j = 0; j < data[i].names1.length; j++) {
                val = Math.sqrt(Math.pow(data[i].x1[j], 2) + Math.pow(data[i].y1[j], 2));
                if (val > max_val) {
                    max_val = val;
                }
            }
            for (let j = 0; j < data[i].names2.length; j++) {
                val = Math.sqrt(Math.pow(data[i].x2[j], 2) + Math.pow(data[i].y2[j], 2));
                if (val > max_val) {
                    max_val = val;
                }
            }
            for (let j = 1; j < data[i].names1.length; j++) {
                if ((Math.abs(data[i].x1[j] - data[i].x1[j-1]) > 0) || (Math.abs(data[i].y1[j]-data[i].y1[j-1]) > 0)) {
                    arr = arrow(data[i].x1[j] - data[i].x1[j-1], data[i].y1[j]-data[i].y1[j-1], max_val);
                }
                else {
                    arr = [0, 0, 0, 0];
                }
                data_plot.push({
                    x: [data[i].x1[j-1], data[i].x1[j], arr[0] + data[i].x1[j-1], data[i].x1[j], arr[2] + data[i].x1[j-1]],
                    y: [data[i].y1[j-1], data[i].y1[j], arr[1] + data[i].y1[j-1], data[i].y1[j], arr[3] + data[i].y1[j-1]],
                    mode: 'lines+text',
                    text: ['', data[i].names1[j], '', '', '', ''],
                    textfont: {
                        family: 'Arial, sans-serif;',
                        size: 12,
                    },
                    textposition: text_position(Math.atan2(data[i].y1[j], data[i].x1[j]) * 180 / Math.PI),
                    line: {
                        color: 'black',
                    },
                    type: 'scatter'
                })
            }
            for (let j = 1; j < data[i].names2.length; j++) {
                if ((Math.abs(data[i].x1[j] - data[i].x1[j-1]) > 0) || (Math.abs(data[i].y1[j]-data[i].y1[j-1]) > 0)) {
                    arr = arrow(data[i].x2[j] - data[i].x2[j-1], data[i].y2[j]-data[i].y2[j-1], max_val);
                }
                else {
                    arr = [0, 0, 0, 0]
                }

                data_plot.push({
                    x: [data[i].x2[j-1], data[i].x2[j], arr[0] + data[i].x2[j-1], data[i].x2[j], arr[2] + data[i].x2[j-1]],
                    y: [data[i].y2[j-1], data[i].y2[j], arr[1] + data[i].y2[j-1], data[i].y2[j], arr[3] + data[i].y2[j-1]],
                    mode: 'lines+text',
                    text: ['', data[i].names2[j], '', '', '', ''],
                    textfont: {
                        family: 'Arial, sans-serif;',
                        size: 12,
                    },
                    textposition: text_position(Math.atan2(data[i].y1[j], data[i].x1[j]) * 180 / Math.PI + 90),
                    line: {
                        color: 'black',
                    },
                    type: 'scatter'
                })
            }
        }
    }

    let layout = {
        title: translator.vector_voltage,
        height: 500,
        showlegend: false,
        font: {
            family: 'Arial, sans-serif;',
            size: 10,
            color: '#000'
        },
        yaxis: {
            scaleanchor: "x",
        },
    }

    Plotly.newPlot('vector_u', data_plot, layout, {
        showLink: false,
        displaylogo: false,
        displayModeBar: false,
    });

}

function text_position(ang) {
    if (ang > 180) {
        ang = ang - 360;
    }
    else if (ang < -180) {
        ang = ang + 360;
    }
    if (ang > 0 & ang < 90) {
        return 'right+top'
    }
    else if (ang >= 90 & ang < 180) {
        return 'left+top'
    }
    else if (ang <= 0 & ang >= -90) {
        return 'right+bottom'
    }
    else {
        return 'left+bottom'
    }
}

function vector_i_selector_creator(data) {
    let checkboxes = document.getElementById('vector_i_checkboxes');
    checkboxes.innerHTML = translator.vector_current_checkbox;
    for (let i = 0; i < data.length; i++) {
        if (i < data.length - 1) {
            checkboxes.innerHTML += `<input type="checkbox" onchange="vector_i(response['vector']['vector_i_data'])" id=${'checkbox_i_' + i} checked>` + data[i].num + translator.node_number + '</br>';
        }
        else {
            checkboxes.innerHTML += `<input type="checkbox" onchange="vector_i(response['vector']['vector_i_data'])" id=${'checkbox_i_' + i}>` + data[i].num + translator.node_number + '</br>';
        }
    }
    checkboxes.innerHTML += '</p>';
}

function vector_u_selector_creator(data) {
    let checkboxes = document.getElementById('vector_u_checkboxes');
    checkboxes.innerHTML = translator.vector_voltage_checkbox;
    for (let i = 0; i < data.length; i++) {
        checkboxes.innerHTML += `<input type="checkbox" onchange="vector_u(response['vector']['vector_u_data'])" id=${'checkbox_u_' + i} checked>` + data[i].num + translator.loop_number + '</br>';
    }
    checkboxes.innerHTML += '</p>';
}

function arrow(x, y, rad) {
    let fy = Math.atan2(y, x) * 180 / Math.PI;
    dphi = 10;
    let fyRad1 = (fy + 180 + dphi) * Math.PI / 180.0;
    let fyRad2 = (fy + 180 - dphi) * Math.PI / 180.0;
    let radius = 0.05 * rad;
    let x1 = radius * Math.cos(fyRad1) + x;
    let y1 = radius * Math.sin(fyRad1) + y;
    let x2 = radius * Math.cos(fyRad2) + x;
    let y2 = radius * Math.sin(fyRad2) + y;
    return [x1, y1, x2, y2];
}

// Сохранение файла схемы в формате *.FLT (XML)
function save_file(graph) {
    let button = document.getElementById('save_file');
    button.onclick = function() {
        var encoder = new mxCodec();
        var model = encoder.encode(graph.getModel());
        var data = mxUtils.getPrettyXml(model);
        data = "data:text/xml;charset=utf-8," + data;
        var encodedUri = encodeURI(data);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", 'circuit.flt');
        document.body.appendChild(link);
        link.click();
    };
}

// Открытие файла схемы
function open_file(graph) {
    let control = document.getElementById('input_file');
    control.onchange = function() {
        let file = control.files[0];
        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function() {
            var doc = mxUtils.parseXml(reader.result);
            var codec = new mxCodec(doc);
            codec.decode(doc.documentElement, graph.getModel());
            calc_type_ = 0;
            for (i in graph.model.cells) {
                cell = graph.model.cells[i];
                try {
                    if (((cell.value.nodeName == 'capacitor') && (cell.value.attributes[1].nodeName == 'capacitance'))
                        || ((cell.value.nodeName == 'inductor') && (cell.value.attributes[1].nodeName == 'inductance'))) {
                        calc_type_ = 1;
                    }
                }
                catch {
                }

            }
            if (calc_type_ == 1) {
                document.getElementById('fh').checked = true;
                document.getElementById('frequency').disabled = false;
                document.getElementById('toolbar').innerHTML = '';
                create_toolbar('toolbar', graph, base_path, calc_type_);
                change_elements(graph, calc_type_);
            }
            else {
                document.getElementById('ohm').checked = true;
                document.getElementById('frequency').disabled = true;
                document.getElementById('toolbar').innerHTML = '';
                create_toolbar('toolbar', graph, base_path, calc_type_);
                change_elements(graph, calc_type_);
            }
        };

        reader.onerror = function() {
            console.log(reader.error);
        };
    }
}

// Удаление несоединённых ветвей
function remove_not_connected_edges(graph) {
    var parent = graph.getDefaultParent();
    var model = graph.getModel();
    model.beginUpdate();

    try {
        for (i in model.cells) {
            if (model.cells[i].edge == true && (model.cells[i].target == null || model.cells[i].source == null)) {
                graph.removeCells([model.cells[i]]);
                continue;
            }
        }
    }
    finally
    {
        graph.getModel().endUpdate();
    }
}

// Формирование списка ветвей
function edit_selector() {
    value = document.getElementById('method_selector').value;
    if (Number(value) == 3) {
        document.getElementById('meg_block').style = 'display:block;'
    }
    else {
        document.getElementById('meg_block').style = 'display:none;'
    }
}

function define_branches() {
    var encoder = new mxCodec();
    var model = encoder.encode(graph.getModel());
    var data = mxUtils.getPrettyXml(model);

    let xhr = new XMLHttpRequest();
    let uri = base_uri + "api/branches";

    let calc_type = 0;
    let frequency = Number(document.getElementById('frequency').value);

    if (document.getElementById('ohm').checked) {
        calc_type = 0;
    }
    else {
        calc_type = 1;
    }

//    let method = document.getElementById('method_selector').value;

    xhr.open("POST", uri, true);
    xhr.send(JSON.stringify({
        'data': data,
        'lang': lang,
        'calc_type': calc_type,
        'frequency': frequency,
        }));

    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                response = JSON.parse(xhr.response);
                if (response['result'] == 'success') {
                    let message = response['message'];
                    let selector = document.getElementById('branch_num');
                    selector.innerHTML = '<select id="branch_num"><option value="-">-</option></select>';
                    for (let i = 0; i < message.length; i++) {
                        selector.options[selector.options.length] = new Option(message[i], i);
                    }
                }
                else {
                    alert(response['message']);
                }
            }
            else {
                alert(translator.server_error)
            }
        }
    }

   
    
}


function main(flag)
{

    base_path = 'https://faultan.ru/wp-content/themes/neve/my/circuit/'
    if (!mxClient.isBrowserSupported())
    {
        mxUtils.error('Browser is not supported!', 200, false);
        alert(translator.browser_error);
        return;
    }

//    is_mobile = true;
//    console.log(is_mobile)

   



    container = document.getElementById('container')

    graph = new mxGraph(container);
   
    
    setupTouchHandlers(graph, container);
    // setupTooltipConnectors(graph, container);
    
const connectors = setupTooltipConnectors(graph, graph.container);
graph._connectors = connectors;   // <— простой «шаринг» API

    calc_type = 0;
    create_toolbar('toolbar', graph, base_path, calc_type);
    document.getElementById('toolbar').focus();

    var calc_type = document.querySelector('calc_type');
    document.body.addEventListener('change', function(e) {
        let target = e.target;
        switch (target.id) {
            case 'ohm':
                document.getElementById('frequency').disabled = true;
                calc_type = 0;
                document.getElementById('toolbar').innerHTML = '';
                create_toolbar('toolbar', graph, base_path, calc_type);
                change_elements(graph, calc_type);
                break;
            case 'fh':
                document.getElementById('frequency').disabled = false;
                calc_type = 1;
                document.getElementById('toolbar').innerHTML = '';
                create_toolbar('toolbar', graph, base_path, calc_type);
                change_elements(graph, calc_type);
                break;
            }
    });

    graph.centerZoom = true;
    graph.view.scale = 1;
    graph.setPanning(true);

    graph.setConnectable(true);
    graph.setConnectableEdges(true);
    graph.setDisconnectOnMove(false);
    graph.foldingEnabled = false;
    graph.setTooltips(true);
    graph.connectionHandler.setEnabled(true);
    graph.dropEnabled = true;
//    graph.setMultigraph(true);

    //Maximum size
//    graph.maximumGraphBounds = new mxRectangle(0, 0, 1200, 800)
    graph.border = 0;

    // Panning handler consumed right click so this must be
    // disabled if right click should stop connection handler.
    graph.panningHandler.isPopupTrigger = function() { return false; };

    // Enables return key to stop editing (use shift-enter for newlines)
    graph.setEnterStopsCellEditing(true);

    // Adds rubberband selection
    var rubberband = new mxRubberband(graph);

    // Alternative solution for implementing connection points without child cells.
    // This can be extended as shown in portrefs.html example to allow for per-port
    // incoming/outgoing direction.
    graph.getAllConnectionConstraints = function(terminal)
    {
        var geo = (terminal != null) ? this.getCellGeometry(terminal.cell) : null;
        if ((geo != null ? !geo.relative : false) &&
            this.getModel().isVertex(terminal.cell) &&
            this.getModel().getChildCount(terminal.cell) == 0)
        {
            return [new mxConnectionConstraint(new mxPoint(0, 0.5), false),
                new mxConnectionConstraint(new mxPoint(1, 0.5), false)];
        }

        return null;
    };

    // Makes sure non-relative cells can only be connected via constraints
    graph.connectionHandler.isConnectableCell = function(cell)
    {
        if (this.graph.getModel().isEdge(cell))
        {
            return true;
        }
        else
        {
            var geo = (cell != null) ? this.graph.getCellGeometry(cell) : null;

            return (geo != null) ? geo.relative : false;
        }
    };
    mxEdgeHandler.prototype.isConnectableCell = function(cell)
    {
        return graph.connectionHandler.isConnectableCell(cell);
    };

    var getTooltipForCell = graph.getTooltipForCell;

    graph.getTooltipForCell = function(cell)
    {
        var tip = '';

        if (cell != null)
        {
            var src = this.getModel().getTerminal(cell, true);

            if (src != null)
            {
                tip += this.getTooltipForCell(src) + ' ';
            }

            var parent = this.getModel().getParent(cell);

            if (this.getModel().isVertex(parent))
            {
                tip += this.getTooltipForCell(parent) + '.';
            }

            tip += getTooltipForCell.apply(this, arguments);

            var trg = this.getModel().getTerminal(cell, false);

            if (trg != null)
            {
                tip += ' ' + this.getTooltipForCell(trg);
            }
        }
        return tip;
    };

    graph.getStylesheet().putDefaultEdgeStyle({
    edgeStyle: 'wireEdgeStyle',
    shape: 'connector',
    rounded: false,
    endArrow: 'block',
    html: false
});

    var labelBackground = '#FFFFFF';
    var fontColor = '#000000';
    var strokeColor = '#000000';

    var style = graph.getStylesheet().getDefaultEdgeStyle();
    delete style['endArrow'];
    style['strokeColor'] = strokeColor;
    style['labelBackgroundColor'] = labelBackground;
    style['edgeStyle'] = 'wireEdgeStyle';
    style['fontColor'] = fontColor;
    style['fontSize'] = '9';
    style['movable'] = '0';
    style['strokeWidth'] = strokeWidth;

    // Sets join node size
    style['startSize'] = joinNodeSize;
    style['endSize'] = joinNodeSize;

    style = graph.getStylesheet().getDefaultVertexStyle();
    style['strokeColor'] = strokeColor;
    style['fillColor'] = 'none';
    style['fontColor'] = fontColor;
    style['fontStyle'] = '1';
    style['fontSize'] = '12';
    style['resizable'] = '0';
    style['rounded'] = '0';
    style['strokeWidth'] = strokeWidth;
    

 // Мобильные устройства
 

//     Undo/redo
     undoManager = new mxUndoManager();
     var listener = function(sender, evt)
     {
         undoManager.undoableEditHappened(evt.getProperty('edit'));
     };
     graph.getModel().addListener(mxEvent.UNDO, listener);
     graph.getView().addListener(mxEvent.UNDO, listener);

     document.getElementById('buttons').appendChild(mxUtils.button(translator.undo_button, function()
     {
         undoManager.undo(); // TODO: добавить поддержку "Ctrl+Z"
     }));

//     if (is_mobile) {
//          document.getElementById('buttons').appendChild(mxUtils.button('+', function()
//          {
//              graph.zoomIn();
//          }));
//
//          document.getElementById('buttons').appendChild(mxUtils.button('-', function()
//          {
//              graph.zoomOut();
//          }));
//     }

    // Grid
    if (!is_mobile) {
        grid_path = 'url(\'https://faultan.ru/wp-content/themes/neve/my/circuit/images/wires-grid.gif\')';

        container.style.background = grid_path;

        grid_checkbox = document.getElementById('grid_enabled');

        mxEvent.addListener(grid_checkbox, 'click', function(evt)
        {
            if (grid_checkbox.checked)
            {
                container.style.background = grid_path;
            }
            else
            {
                container.style.background = '';
            }
        });
    }

    // document.body.appendChild(mxUtils.button('Redo', function()
    // {
    //     undoManager.redo(); // TODO: добавить поддержку "Ctrl+Y"
    // }));

    is_calc_started = false;

    document.getElementById('buttons').appendChild(mxUtils.button(translator.delete_button, function()
    {
        graph.removeCells();
        if (is_calc_started) {
            delete_arrow_nodes(graph);
        }
    }));

    var keyHandler = new mxKeyHandler(graph);
    keyHandler.bindKey(46, function(evt) {
        if (graph.isEnabled()) {
            graph.removeCells();
            if (is_calc_started) {
                delete_arrow_nodes(graph);
            }
        }
    });

    // Adds an option to view the XML of the graph
    document.getElementById('buttons').appendChild(mxUtils.button(translator.calculate_button, function()
    {
        is_calc_started = true;
        var encoder = new mxCodec();
        var model = encoder.encode(graph.getModel());
        var data = mxUtils.getPrettyXml(model);

        if (flag) {d1 = data.slice(0, 5) + 'а' + data.slice(6, data.length); data = d1;}

        let xhr = new XMLHttpRequest();
        let uri = base_uri + "api/calc";

        let method = document.getElementById('method_selector').value;
        if (lang != 'ru') {
            method = 0;
        }

        let calc_type = 0;
        let frequency = Number(document.getElementById('frequency').value);

        if (document.getElementById('ohm').checked) {
            calc_type = 0;
        }
        else {
            calc_type = 1;
        }

        xhr.open("POST", uri, true);
        if (Number(method) != 3) {
            xhr.send(JSON.stringify({
                'data': data,
                'method': method,
                'lang': lang,
                'calc_type': calc_type,
                'frequency': frequency
                }));
        }
        else {
            document.getElementById("result").innerHTML = '';
            document.getElementById('vector_i').innerHTML = '';
            document.getElementById('vector_i_checkboxes').innerHTML = '';
            document.getElementById('vector_u').innerHTML = '';
            document.getElementById('vector_u_checkboxes').innerHTML = '';
            let branch_number = document.getElementById('branch_num').value;
            if (branch_number != '-') {
                xhr.send(JSON.stringify({
                    'data': data,
                    'method': method,
                    'num': branch_number,
                    'lang': lang,
                    'calc_type': calc_type,
                    'frequency': frequency
                    }));
            }
            else {
                alert(translator.meg_alert)
            }
        }

        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    disp_result(xhr, graph, data, flag, Number(method));
                }
                } else {
                    alert(translator.server_error)
                }
            }

    }));

    var connectionHandlerMouseUp = graph.connectionHandler.mouseUp;
   
  graph.connectionHandler.mouseUp = function (sender, me) {
    // try {

    //      if (!me || typeof me.getEvent !== 'function') {
    //   console.warn('[mouseUp] Пустой или некорректный mxMouseEvent:', me);
    //   return;
    // }

    // const ev = me.getEvent(); // Безопасно — проверили выше

    // const x = ev?.clientX ?? me.graphX;
    // const y = ev?.clientY ?? me.graphY;

    //     if (this.first != null && this.previous != null) {
    //         const point = mxUtils.convertPoint(this.graph.container, x, y);
    //         const dx = Math.abs(point.x - this.first.x);
    //         const dy = Math.abs(point.y - this.first.y);

    //         if (dx < this.graph.tolerance && dy < this.graph.tolerance) {
    //             if (this.graph.getModel().isEdge(this.previous.cell)) {
    //                 this.reset();
    //             }
    //             return;
    //         }
    //     }

    //     connectionHandlerMouseUp.apply(this, arguments);
    // } catch (e) {
    //     console.warn('[mouseUp] Error caught:', e);
    // }
        console.log('Сработал mouseUp в Handler')
        if (this.first != null && this.previous != null)
        {
            var point = mxUtils.convertPoint(this.graph.container, me.getX(), me.getY());
            var dx = Math.abs(point.x - this.first.x);
            var dy = Math.abs(point.y - this.first.y);

            if (dx < this.graph.tolerance && dy < this.graph.tolerance)
            {
                if (this.graph.getModel().isEdge(this.previous.cell))
                {
                    this.reset();
                }

                return;
            }
        }

        connectionHandlerMouseUp.apply(this, arguments);
};

    mxEvent.disableContextMenu(container);

    // Defines the tolerance before removing the icons
    var iconTolerance = 20;

    // Shows icons if the mouse is over a cell
    graph.addMouseListener(
    {
   currentState: null,
        currentIconSet: null,
        mouseDown: function(sender, me)
        {
            // Hides icons on mouse down
            if (this.currentState != null) {
                this.dragLeave(me.getEvent(), this.currentState);
                this.currentState = null;
            }

            remove_not_connected_edges(graph);

        },
        mouseMove: function(sender, me)
        {
            if (this.currentState != null && (me.getState() == this.currentState || me.getState() == null))
            {
                var tol = iconTolerance;
                var tmp = new mxRectangle(me.getGraphX() - tol, me.getGraphY() - tol, 2 * tol, 2 * tol);

                if (mxUtils.intersects(tmp, this.currentState))
                {
                    return;
                }
            }

            var tmp = graph.view.getState(me.getCell());

            // Ignores everything but vertices
            if (graph.isMouseDown || (tmp != null && !graph.getModel().isVertex(tmp.cell)))
            {
                tmp = null;
            }

            if (tmp != this.currentState)
            {
                if (this.currentState != null)
                {
                    this.dragLeave(me.getEvent(), this.currentState);
                }
                this.currentState = tmp;

                if (this.currentState != null)
                {
                    this.dragEnter(me.getEvent(), this.currentState);
                }
            }
        },
        mouseUp: function(sender, me)
        {
            try {
                if (this.currentIconSet == null && me.getState().cell.value.attributes[0] != null) {
                    this.currentIconSet = new mxIconSet(me.getState());
                    me.getState().view.graph.connectionHandler.constraintHandler.setFocus(me, me.getState(), true);
                }
                else if (me.getState() == null) {
                    this.currentIconSet.destroy();
                    this.currentIconSet = null;
                }
            }
            catch {
            }
        },
        dragEnter: function(evt, state)
        {
            try {
                if (this.currentIconSet == null && state.cell.value.attributes[0] != null) {
                    this.currentIconSet = new mxIconSet(state);
                }
            }
            catch {
            }
        },
        dragLeave: function(evt, state)
        {
            if (this.currentIconSet != null)
            {
                this.currentIconSet.destroy();
                this.currentIconSet = null;
            }
        },
    });
    


    // Setting of properties

    // Stops editing on enter key, handles escape
    new mxKeyHandler(graph);

    // Overrides method to disallow edge label editing
    graph.isCellEditable = function(cell)
    {
        return !this.getModel().isEdge(cell);
    };

    // Overrides method to provide a cell label in the display
    graph.convertValueToString = function(cell)
    {
        if (mxUtils.isNode(cell.value))
        {
            count = 0;
            num = cell.getAttribute('num');

            cells = graph.getModel().cells;

            for (i in cells) {
                try {
                    if (cells[i].value.nodeName == cell.value.nodeName) {
                        count += 1;
                    }
                }
                catch {
                }
            }

            if (num == '?') {
                cell.setAttribute('num', count);
                num = cell.getAttribute('num');
            }

            if (cell.value.nodeName == 'resistor')
            {
                return 'R' + num;
            }
            else if (cell.value.nodeName == 'capacitor')
            {
                return 'C' + num;
            }
            else if (cell.value.nodeName == 'inductor')
            {
                return 'L' + num;
            }
            else if (cell.value.nodeName == 'voltage')
            {
                return 'E' + num;
            }
            else if (cell.value.nodeName == 'current')
            {
                return 'J' + num;
            }
        }
        else
        {
            return cell.value;
        }

        return '';
    };

    // Overrides method to store a cell label in the model
    var cellLabelChanged = graph.cellLabelChanged;
    graph.cellLabelChanged = function(cell, newValue, autoSize)
    {
        if (mxUtils.isNode(cell.value))
        {
            // Clones the value for correct undo/redo
            var elt = cell.value.cloneNode(true);

            elt.setAttribute('num', newValue);

            newValue = elt;
            autoSize = true;
        }

        cellLabelChanged.apply(this, arguments);
    };

    // Overrides method to create the editing value
    var getEditingValue = graph.getEditingValue;
    graph.getEditingValue = function(cell)
    {
        if (mxUtils.isNode(cell.value))
        {
            var num = cell.getAttribute('num', '');
            return num;
        }
    };

    // Implements a properties panel that uses
    // mxCellAttributeChange to change properties
    graph.getSelectionModel().addListener(mxEvent.CHANGE, function(sender, evt)
    {
        selectionChanged(graph);
    });

    selectionChanged(graph);


    /**
     * Updates the properties panel
     */
    function selectionChanged(graph)
    {
        var div = document.getElementById('properties');
        // Forces focusout in IE
//        graph.container.focus();

        // Clears the DIV the non-DOM way
        div.innerHTML = '';

        // Gets the selection cell
        var cell = graph.getSelectionCell();

        if (cell == null)
        {
            mxUtils.writeln(div, translator.select_item);
        }
        else if (! cell.edge)
        {

            var form = new mxForm();

            var attrs = cell.value.attributes;

            if (attrs) {
                for (var i = 0; i < attrs.length; i++)
                {
                    createTextField(graph, form, cell, attrs[i]);
                }

                div.appendChild(form.getTable());
            }
        }
    }

    /**
        * Creates the textfield for the given property.
    */
    function createTextField(graph, form, cell, attribute)
    {

        let dict = {
            'num': translator.num,
            'resistance': translator.resistance,
            'capacitance': translator.capacitance,
            'inductance': translator.inductance,
            'impedance': translator.impedance,
            'peak': translator.peak,
            'phase': translator.phase,
            'freq': translator.freq,
        }

        var input = form.addText(dict[attribute.nodeName] + ':', attribute.nodeValue);

        var applyHandler = function()
        {
            var newValue = input.value || '';
            var oldValue = cell.getAttribute(attribute.nodeName, '');

            if (newValue != oldValue)
            {
                graph.getModel().beginUpdate();

                try
                {
                    var edit = new mxCellAttributeChange(cell, attribute.nodeName, newValue);
                    graph.getModel().execute(edit);
                }
                finally
                {
                    graph.getModel().endUpdate();
                }
            }
        };

        mxEvent.addListener(input, 'keypress', function (evt)
        {
            // Needs to take shift into account for textareas
            if (evt.keyCode == /*enter*/13 && !mxEvent.isShiftDown(evt)) {
                input.blur();
//                graph.zoomTo(1);
            }
        });

        if (mxClient.IS_IE)
        {
            mxEvent.addListener(input, 'focusout', applyHandler);
//            graph.zoomTo(1);
        }
        else
        {
            // Note: Known problem is the blurring of fields in
            // Firefox by changing the selection, in which case
            // no event is fired in FF and the change is lost.
            // As a workaround you should use a local variable
            // that stores the focused field and invoke blur
            // explicitely where we do the graph.focus above.
            mxEvent.addListener(input, 'blur', applyHandler);
//            graph.zoomTo(1);
        }
    }

    document.getElementById('open_file').addEventListener('change', open_file(graph));
    document.getElementById('save_file').addEventListener('click', save_file(graph));

//    addEventListener('keydown', some_actions(event));

    if (!flag) {
        alert(translator.demo_state);
        is_demo = confirm(translator.demo_example);
        if (is_demo) {
            demo_task = `<mxGraphModel>
                  <root>
                    <mxCell id="0" />
                    <mxCell id="1" parent="0" />
                    <voltage num="1" peak="10" phase="45" id="2">
                      <mxCell style="shape=voltage;verticalLabelPosition=middle;labelPosition=left;direction=north;" vertex="1" parent="1">
                        <mxGeometry x="150" y="210" width="40" height="40" as="geometry" />
                      </mxCell>
                    </voltage>
                    <resistor num="1" resistance="1.2" id="3">
                      <mxCell style="shape=resistor;verticalLabelPosition=top;labelPosition=center;" vertex="1" parent="1">
                        <mxGeometry x="220" y="130" width="52" height="22" as="geometry" />
                      </mxCell>
                    </resistor>
                    <mxCell id="4" style="exitX=0;exitY=0.5;exitDx=0;exitDy=0;exitPerimeter=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;entryPerimeter=0;" edge="1" parent="1" source="3" target="2">
                      <mxGeometry relative="1" as="geometry" />
                    </mxCell>
                    <capacitor num="1" impedance="1.1" id="5">
                      <mxCell style="shape=capacitor;verticalLabelPosition=middle;labelPosition=left;direction=south;" vertex="1" parent="1">
                        <mxGeometry x="292" y="218" width="40" height="24" as="geometry" />
                      </mxCell>
                    </capacitor>
                    <resistor num="2" resistance="3.7" id="6">
                      <mxCell style="shape=resistor;verticalLabelPosition=top;labelPosition=center;" vertex="1" parent="1">
                        <mxGeometry x="380" y="130" width="52" height="22" as="geometry" />
                      </mxCell>
                    </resistor>
                    <inductor num="1" impedance="2.4" id="7">
                      <mxCell style="shape=inductor;verticalLabelPosition=middle;labelPosition=left;direction=south;" vertex="1" parent="1">
                        <mxGeometry x="507" y="210" width="32" height="66" as="geometry" />
                      </mxCell>
                    </inductor>
                    <mxCell id="8" style="exitX=0;exitY=0.5;exitDx=0;exitDy=0;exitPerimeter=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;entryPerimeter=0;" edge="1" parent="1" source="5" target="3">
                      <mxGeometry relative="1" as="geometry" />
                    </mxCell>
                    <mxCell id="9" style="exitX=0;exitY=0.5;exitDx=0;exitDy=0;exitPerimeter=0;" edge="1" parent="1" source="6" target="8">
                      <mxGeometry relative="1" as="geometry">
                        <mxPoint x="310" y="140" as="targetPoint" />
                      </mxGeometry>
                    </mxCell>
                    <mxCell id="10" style="exitX=1;exitY=0.5;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;entryPerimeter=0;" edge="1" parent="1" source="5" target="2">
                      <mxGeometry relative="1" as="geometry">
                        <Array as="points">
                          <mxPoint x="312" y="330" />
                          <mxPoint x="170" y="330" />
                        </Array>
                      </mxGeometry>
                    </mxCell>
                    <mxCell id="12" style="exitX=0;exitY=0.5;exitDx=0;exitDy=0;exitPerimeter=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;entryPerimeter=0;" edge="1" parent="1" source="7" target="6">
                      <mxGeometry relative="1" as="geometry" />
                    </mxCell>
                    <resistor num="3" resistance="1.5" id="13">
                      <mxCell style="shape=resistor;verticalLabelPosition=top;labelPosition=center;" vertex="1" parent="1">
                        <mxGeometry x="380" y="320" width="52" height="22" as="geometry" />
                      </mxCell>
                    </resistor>
                    <mxCell id="14" style="exitX=0;exitY=0.5;exitDx=0;exitDy=0;exitPerimeter=0;" edge="1" parent="1" source="13" target="10">
                      <mxGeometry relative="1" as="geometry">
                        <mxPoint x="310" y="330" as="targetPoint" />
                        <Array as="points">
                          <mxPoint x="320" y="330" />
                        </Array>
                      </mxGeometry>
                    </mxCell>
                    <mxCell id="15" style="exitX=1;exitY=0.5;exitDx=0;exitDy=0;exitPerimeter=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;entryPerimeter=0;" edge="1" parent="1" source="13" target="7">
                      <mxGeometry relative="1" as="geometry" />
                    </mxCell>
                    <current num="1" peak="5" phase="25" id="16">
                      <mxCell style="shape=current;verticalLabelPosition=middle;labelPosition=left;direction=north;" vertex="1" parent="1">
                        <mxGeometry x="610" y="230" width="40" height="40" as="geometry" />
                      </mxCell>
                    </current>
                    <mxCell id="17" style="exitX=1;exitY=0.5;exitDx=0;exitDy=0;exitPerimeter=0;" edge="1" parent="1" source="16" target="12">
                      <mxGeometry relative="1" as="geometry">
                        <mxPoint x="530" y="140" as="targetPoint" />
                      </mxGeometry>
                    </mxCell>
                    <mxCell id="18" style="exitX=0;exitY=0.5;exitDx=0;exitDy=0;exitPerimeter=0;" edge="1" parent="1" source="16" target="15">
                      <mxGeometry relative="1" as="geometry">
                        <mxPoint x="520" y="330" as="targetPoint" />
                      </mxGeometry>
                    </mxCell>
                  </root>
                </mxGraphModel>`
            var doc = mxUtils.parseXml(demo_task);
            var codec = new mxCodec(doc);
            codec.decode(doc.documentElement, graph.getModel());
            setTimeout(() => {  alert(translator.demo_message); }, 1000);
        }
    }
    
 // адаптция, тачи по портам.
 if (!mxGraphView.prototype.getConnectorPoint) {
    mxGraphView.prototype.getConnectorPoint = function(state, constraint) {
        if (state != null && constraint.point != null) {
            const pt = new mxPoint(
                state.x + constraint.point.x * state.width,
                state.y + constraint.point.y * state.height
            );
            return pt;
        }
        return null;
    };
}
    



};

function setupTouchHandlers(graph,container){
    const handler = graph.connectionHandler;
     function logHandlerState(context) {
    console.log(`[${context}] connectionHandler state:`, {
      first: handler.first,
      previous: handler.previous,
      currentState: handler.currentState,
      edgeState: handler.edgeState,
      shape: handler.shape,
      sourceConstraint: handler.sourceConstraint,
    });
  }
    if (handler.first || handler.shape || handler.edgeState || handler.currentState) {
  console.warn('[INIT] 🧹 Форс сброс перед установкой touchHandlers');
    logHandlerState('INIT - BEFORE RESET');

  if (typeof handler.reset === 'function') {
    handler.reset();
  } else {
    handler.shape = null;
    handler.edgeState = null;
    handler.previous = null;
    handler.first = null;
    handler.currentState = null;
    handler.sourceConstraint = null;
  }
   logHandlerState('INIT - AFTER RESET');
  activeTouch = false;
}
    const radius = 12;
    
 function resetHandler(handler) {
  try {
    if (handler.shape) {
      handler.shape.destroy();
    }
  } catch (e) {
    console.warn('[RESET] Ошибка при destroy shape', e);
  }

  handler.shape = null;
  handler.edgeState = null;
  handler.previous = null;
  handler.first = null;
  handler.currentState = null;
  handler.sourceConstraint = null;

  if (typeof handler.reset === 'function') {
    handler.reset();
  }

  activeTouch = false;
  console.log('[RESET] 🧹 Полный сброс состояния connectionHandler');
}



  container.addEventListener('touchstart', function (event) {
//     const touch = event.touches[0];
//   const pt = mxUtils.convertPoint(graph.container, touch.clientX, touch.clientY);
//   const cell = graph.getCellAt(pt.x, pt.y);
//   const isPreviewVisible = handler.shape != null || handler.first != null;

//   logHandlerState('TOUCHSTART - BEGIN');

//   // 💥 Независимо от места — убиваем зависшее соединение
//   if (isPreviewVisible) {
//     console.warn('[TOUCHSTART] 🔄 Принудительный сброс перед новым соединением');
//     safelyResetConnection(handler);
//     activeTouch = false;
//   }

//   if (!cell) {
//     console.log('[TOUCHSTART] ❌ Пустой тап — выход');
//     logHandlerState('TOUCHSTART - TAP EMPTY AREA');
//     return;
//   }

//   const state = graph.view.getState(cell);
//   if (!state) return;

//   const constraints = graph.getAllConnectionConstraints(state);
//   if (!constraints || constraints.length === 0) return;

//   const touchPt = pt;
//   let matchedConstraint = null;

//   for (const constraint of constraints) {
//     const portPt = graph.view.getConnectorPoint(state, constraint);
//     if (portPt) {
//       const dx = portPt.x - touchPt.x;
//       const dy = portPt.y - touchPt.y;
//       const dist = Math.sqrt(dx * dx + dy * dy);
//       if (dist < radius) {
//         matchedConstraint = constraint;
//         break;
//       }
//     }
//   }

//   if (matchedConstraint) {
//     // ⏱️ Короткий таймаут, чтобы дать сбросу завершиться
//     setTimeout(() => {
//       if (handler.shape || handler.first) {
//         console.warn('[TOUCHSTART] 🛑 shape или first не были сброшены!');
//         safelyResetConnection(handler);
//       }

//       console.log('[TOUCHSTART] ✅ Начинаем соединение от порта');
//       handler.sourceConstraint = matchedConstraint;
//       handler.start(state, matchedConstraint);
//       activeTouch = true;

//       logHandlerState('TOUCHSTART - AFTER START');
//     }, 10); // Можно увеличить до 20–30, если нужно
//   }
// }, { passive: false });

// // вынесем в функцию
// function safelyResetConnection(handler) {
//   try {
//     if (handler.shape) {
//       handler.shape.destroy();
//     }
//   } catch (e) {
//     console.warn('[RESET] Error destroying shape:', e);
//   }

//   handler.shape = null;
//   handler.edgeState = null;
//   handler.previous = null;
//   handler.first = null;
//   handler.currentState = null;
//   handler.sourceConstraint = null;

//   if (typeof handler.reset === 'function') {
//     handler.reset();
//   }

//   console.log('[RESET] 🧹 Все сброшено');}

    const touch = event.touches[0];
  const pt = mxUtils.convertPoint(graph.container, touch.clientX, touch.clientY);
  const cell = graph.getCellAt(pt.x, pt.y);

  const isPreviewVisible =
    handler.shape != null || handler.first != null || handler.edgeState != null;

  logHandlerState('TOUCHSTART - BEGIN');

  if (!cell) {
    // Пустой тап — возможно, сброс
    if (isPreviewVisible) {
      console.log('[TOUCHSTART] ❌ Пустой тап, сбрасываем висящую линию');
      resetHandler(handler);
    }
    logHandlerState('TOUCHSTART - TAP EMPTY AREA');
    return;
  }

  const state = graph.view.getState(cell);
  if (!state) {
    console.warn('[TOUCHSTART] ⚠️ state отсутствует');
    return;
  }

  const constraints = graph.getAllConnectionConstraints(state);
  if (!constraints || constraints.length === 0) {
    console.warn('[TOUCHSTART] ⚠️ У вершины нет портов (connection constraints)');
    return;
  }

  const radius = 12;
  const touchPt = pt;
  let matchedConstraint = null;

  for (const constraint of constraints) {
    const portPt = graph.view.getConnectorPoint(state, constraint);
    if (portPt) {
      const dx = portPt.x - touchPt.x;
      const dy = portPt.y - touchPt.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        matchedConstraint = constraint;
        break;
      }
    }
  }

  if (matchedConstraint) {
    console.log('[TOUCHSTART] ✅ Найден порт. Сброс и отложенный старт соединения');
    resetHandler(handler); // Сброс перед началом

    // Гарантируем, что reset завершится до старта
    requestAnimationFrame(() => {
      handler.sourceConstraint = matchedConstraint;
      handler.start(state, matchedConstraint);
      activeTouch = true;
      logHandlerState('TOUCHSTART - AFTER START');
    });
  } else {
    console.log('[TOUCHSTART] ❌ Порт не задет — соединение не начато');
  }

  logHandlerState('TOUCHSTART - END');
}, { passive: false });



  container.addEventListener('touchend', function (event) {
    if (!activeTouch) return;
    const touch = event.changedTouches[0];
    const mouseEvent = new MouseEvent('mouseup', {
      clientX: touch.clientX,
      clientY: touch.clientY,
      screenX: touch.screenX,
      screenY: touch.screenY,
      bubbles: true,
      cancelable: true,
      view: window
    });
    container.dispatchEvent(mouseEvent);
    activeTouch = false;
    logHandlerState('TOUCHEND');
  }, { passive: false });


}



function setupTooltipConnectors(graph, container) {
    
    // --- helpers
  function rotateRelPoint(pt, deg) {
    if (!pt) return pt;
    const rad = (deg || 0) * Math.PI / 180;
    const cx = 0.5, cy = 0.5;
    const x = pt.x - cx, y = pt.y - cy;
    const xr = x * Math.cos(rad) - y * Math.sin(rad);
    const yr = x * Math.sin(rad) + y * Math.cos(rad);
    return new mxPoint(xr + cx, yr + cy);
  }

  function vectorToCardinalAngle(dx, dy) {
    if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? 90 : -90;
    return dy >= 0 ? 180 : 0;
  }

  function readRotation(state) {
    try {
      return parseFloat(mxUtils.getValue(state.style, mxConstants.STYLE_ROTATION, 0)) || 0;
    } catch { return 0; }
  }
  function readDirectionAngle(state) {
    const dir = mxUtils.getValue(state.style, mxConstants.STYLE_DIRECTION, mxConstants.DIRECTION_EAST);
    switch (dir) {
      case mxConstants.DIRECTION_NORTH: return -90;
      case mxConstants.DIRECTION_SOUTH: return  90;
      case mxConstants.DIRECTION_WEST:  return 180;
      default: return 0; // EAST
    }
  }
  function totalAngle(state) {
    return (readRotation(state) + readDirectionAngle(state)) % 360;
  }


  const arrowSize  = 24;
  const offsetDist = 20; // как далеко от порта рисуем стрелку
  const arrows   = [];
    let activeHover   = false;
  let hoverCell   = null;
  let activeTouch  = false;
const hitRadius = 40;
  

  function clearArrows() {

    arrows.forEach(a => {
    // поддерживаем оба варианта: a может быть либо объект {el,...}, либо DOM-узел (раньше)
    const el = (a && a.el) ? a.el : a;
    if (el) {
      if (typeof el.remove === 'function') {
        el.remove();
      } else if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  });

    arrows.length = 0;

  }

  function createArrow(pt, center, rotation,startConnectFn) {    
    // вычисляем единичный вектор от центра к порту

    let dx = pt.x - center.x, dy = pt.y - center.y;

    const len = Math.hypot(dx, dy) || 1;

    dx /= len; dy /= len;

  

    const x = pt.x + dx * offsetDist,

      y = pt.y + dy * offsetDist;

      console.log('[ARROWS] createArrow: pt=', {x:pt.x, y:pt.y}, 'center=', center, 'norm=', {dx,dy}, 'pos=', {x,y}, 'rotation=', rotation);

    const img = document.createElement('img');

    img.src    = 'src/images/arrow-up.svg';
    img.className = 'connector-arrow'; 

    img.draggable = false;

    img.ondragstart = () => false;

    Object.assign(img.style, {

    position: 'absolute',

    width:   `${arrowSize}px`,

    height:  `${arrowSize}px`,

    left:   `${x - arrowSize/2}px`,

    top:    `${y - arrowSize/2}px`,

    transform: `rotate(${rotation}deg)`,

    cursor:  'pointer',
    pointerEvents: 'none',

    zIndex:  1000

    });

  

  container.appendChild(img);

  arrows.push({
        el: img,
        centerX: x,
        centerY: y,
        startConnectFn
    });

    
  }

  

  function showArrows(cell) {

  clearArrows();

  if (!graph.getModel().isVertex(cell)) return;

  const state = graph.view.getState(cell);

  if (!state) return;

  

  const center = {

    x: state.x + state.width / 2,

    y: state.y + state.height / 2

  };

  console.log('[ARROWS] state: x=', state.x, 'y=', state.y, 'w=', state.width, 'h=', state.height);

   // Попробуем прочитать rotation (если он есть в стиле) — только для логов
    let rotation = 0;
    try {
      rotation = parseFloat(mxUtils.getValue(state.style, mxConstants.STYLE_ROTATION, 0)) || 0;
    } catch (e) {
      rotation = 0;
    }
    

    console.log('[ARROWS] state: id=', cell.id, 'rotation=', rotation, 'x=', state.x, 'y=', state.y, 'w=', state.width, 'h=', state.height);

  const constraints = graph.getAllConnectionConstraints(state) || [];
const ang = totalAngle(state); // <-- direction + rotation

 for (const c of constraints) {
      if (!c || !c.point) continue;

      // крутим относительную точку порта
      const rp = rotateRelPoint(c.point, ang);

      // строим constraint для старта соединения
      const c2 = new mxConnectionConstraint(rp, !!c.perimeter, c.dx || 0, c.dy || 0, c.name);

      // позиция стрелки: берём ПРЯМОЙ маппинг rp -> bounds (надёжно и предсказуемо)
      const pt = new mxPoint(state.x + rp.x * state.width, state.y + rp.y * state.height);

      // угол иконки по реальному вектору
      const arrowAngle = vectorToCardinalAngle(pt.x - center.x, pt.y - center.y);

    const startConnectFn = (clientX, clientY) => {
    graph.connectionHandler.sourceConstraint = c;

    graph.connectionHandler.start(state, c);
    }
    createArrow(pt, center, arrowAngle,startConnectFn);

  }
  }

  container.addEventListener('mousedown', e => {

    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    for (const arrow of arrows) {
        
        const dx = clickX - arrow.centerX;
        const dy = clickY - arrow.centerY;
        
           if (Math.hypot(dx, dy) <= arrowSize / 2) {
            e.stopPropagation();
            e.preventDefault();
            // 🧹 Жёсткий сброс предварительной линии
      const handler = graph.connectionHandler;
      try {
        if (handler.shape) handler.shape.destroy();
      } catch (err) {
        console.warn('Ошибка destroy shape', err);
      }
      handler.shape = null;
      handler.edgeState = null;
      handler.previous = null;
      handler.first = null;
      handler.currentState = null;
      handler.sourceConstraint = null;

      if (typeof handler.reset === 'function') {
        handler.reset();
      }
            arrow.startConnectFn(e.clientX, e.clientY);
            break;
        }
        
    }
});
  // Десктоп: при наведении показываем
let cursorActive = false;
  container.addEventListener('mousemove', e => {
     if (activeTouch) return;

  const pt = mxUtils.convertPoint(graph.container, e.clientX, e.clientY);
  const cell = graph.getCellAt(pt.x, pt.y);

  if (!activeHover) {
    // Входим только при наведении прямо на элемент
    if (cell && graph.getModel().isVertex(cell)) {
      activeHover = true;
      hoverCell = cell;
      showArrows(cell);
    }
  } else {
    // Уже внутри — проверяем enlarged-зону
    const state = graph.getView().getState(hoverCell);
    if (!state) {
      activeHover = false;
      clearArrows();
      return;
    }

    const x0 = state.x - hitRadius;
    const y0 = state.y - hitRadius;
    const x1 = state.x + state.width  + hitRadius;
    const y1 = state.y + state.height + hitRadius;

    if (pt.x >= x0 && pt.x <= x1 && pt.y >= y0 && pt.y <= y1) {
      // остаёмся в enlarged-зоне → стрелки не трогаем
    } else {
      // вышли за enlarged-зону → сброс
      activeHover = false;
      clearArrows();
    }
  }

  // -->
   
   let inArrowZone = false;
  for (const arrow of arrows) {
    const dx = e.clientX - (container.getBoundingClientRect().left + arrow.centerX);
    const dy = e.clientY - (container.getBoundingClientRect().top + arrow.centerY);
    if (Math.hypot(dx, dy) <= arrowSize / 2) {
      inArrowZone = true;
      break;
    }
  }

  if (inArrowZone && !cursorActive) {
    graph.container.style.cursor = 'pointer'
    cursorActive = true;
  } else if (!inArrowZone && cursorActive) {
     graph.container.style.cursor = ''
    cursorActive = false;
  }
  


  

  });

  

  container.addEventListener('mouseleave', () => {
    activeHover = false;
    if (!activeTouch) {

    hoverCell = null;

    clearArrows();

    }

  });

  
  
  
  
  

  // Моб: окончание тапа = сброс соединения

  container.addEventListener('touchend', () => {

    if (graph.connectionHandler.first || graph.connectionHandler.edgeState) {

    graph.connectionHandler.reset();

    activeTouch = false;

    }

  }, { passive: false });

  

  // Глобальный сброс по mouseup

  document.addEventListener('mouseup', () => {

    if (graph.connectionHandler.first || graph.connectionHandler.edgeState) {

    graph.connectionHandler.reset();

    activeTouch = false;

    }

  });

  
  
  graph.getModel().addListener(mxEvent.CHANGE, (sender, evt) => {
  if (!hoverCell) {
    // Если элемента нет, просто чистим стрелки
    clearArrows();
    return;
  }

  // Проверяем, что ячейка ещё существует
  if (!graph.getModel().contains(hoverCell)) {
    hoverCell = null;
    clearArrows();
    return;
  }
  // Если ячейка есть — пересоздаём стрелки
  setTimeout(() => {
    showArrows(hoverCell);
  }, 0);
});
  

  
  // ВАЖНО: вернуть наружу методы
  return {
    showForCell(cell) { showArrows(cell); },
    clear() { clearArrows(); },
    // refresh() { refresh(); }
  };

  }

 