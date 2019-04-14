// //获取dom节点
const container = document.querySelector("html");
const option = document.querySelector('.selectOption');
const optionsContainer = document.querySelector('.selectOption-container');
const empty = document.querySelector('.noData');
const input = document.querySelector('.input');

// 控制渲染的state
let state = {
    isShowOptions: false,
    options: [
        { name: '李逍遥', id: 1 },
        { name: '赵灵儿', id: 2 },
        { name: '林月如', id: 3 },
        { name: '阿奴', id: 4 },
        { name: '李忆如', id: 5 },
        { name: '刘晋元', id: 6 },
        { name: '彩衣', id: 7 },
        { name: '酒剑仙', id: 8 },
        { name: '剑圣', id: 9 },
        { name: '拜月教主', id: 10 }
    ]
};
// 初始化渲染
renderOptions(state.options);
// 控制selectOption显示
function changeOptionState(isShowOptions) {
    let display = isShowOptions ? 'block' : 'none';
    option.style.display = display
}
// 改变下拉显示状态
function handleInputClick() {
    state.isShowOptions = !state.isShowOptions;
    window.event? window.event.cancelBubble = true:e.stopPropagation();
    changeOptionState(state.isShowOptions)
}
//处理点击冒泡
function handleShowNon() {
    state.isShowOptions = false
    changeOptionState(state.isShowOptions)
}
// 处理selectOption点击事件,input录入text
function handleOptionClick(e) {
    if (e.target.nodeName === 'A') {
        loadAsyncData();
        return
    }
    input.value = e.target.innerText;
}
// 控制动态渲染options
function renderOptions(options, prefixion) {
    if (options.length > 0) {
        optionsContainer.style.display = 'block';
        empty.style.display = 'none';
        let inner;
        //匹配文字红色表示
        if (prefixion) {
            for (let item of options) {
                inner +=
                    '<li>' + "<span style='color:red'>" + prefixion + "</span>" + item.name.replace(prefixion, '') + '</li>'
                optionsContainer.innerHTML = inner;
                optionsContainer.removeChild(optionsContainer.firstChild)
            }
        } else {
            for (let item of options) {
                inner += '<li>' + item.name + '</li>';
                optionsContainer.innerHTML = inner;
                optionsContainer.removeChild(optionsContainer.firstChild)
            }
        }
    } else {
        optionsContainer.style.display = 'none';
        empty.style.display = 'block'
    }
}
// 处理input输入事件
function onValueChange() {
    if (!state.isShowOptions) {
        state.isShowOptions = !state.isShowOptions;
        changeOptionState(state.isShowOptions)
    }
    let value = input.value;
    const newOptions = state.options.filter(x => {
        return x.name.startsWith(value)
    });
    renderOptions(newOptions, value)
}
// 监听selectOption点击事件
option.addEventListener('click', handleOptionClick);
// 监听输入框点击vent
input.addEventListener('click', handleInputClick);
// 监听html点击，组织冒泡
container.addEventListener('click', handleShowNon);
// 监听input输入事件
input.addEventListener('input', onValueChange);

