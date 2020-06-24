const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d")
// 사용하는 canvas의 context가 2d 형태임을 설정
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")
const saveBtn = document.getElementById("jsSave")

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// canvas가 다루는 pixel 사이즈를 설정해줌

ctx.fillStyle = "white"
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
// context의 초기 설정을 하얀색 배경으로 설정
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR
// context에 그려지는 stroke, fill의 초기 설정을 INITIAL_COLOR로 설정
ctx.lineWidth = 2.5
// 검은색, 두께 2.5 선으로 초기값 설정

let painting = false;
// default : painting 상태가 아님
let filling = false;
// fill, paint mode를 바꾸는 상태값, default : false

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // canvas 위에서 마우스의 X,Y 좌표를 숫자로 선언
    if (!painting) {
        ctx.beginPath()
        // painting = false일 때도 path를 생성
        ctx.moveTo(x,y)
        // 마우스 위치 x,y가 path의 시작점
    } else {
        // 클릭 시
        ctx.lineTo(x,y)
        // x,y 위치에 라인을 생성
        ctx.stroke()
        // 생성된 라인에 stroke하여 라인을 canvas에 표시
    }
}

function stopPainting(event){
    painting = false;
}
// 마우스 클릭시 painting 상태 = false

function startPainting(event){
    painting = true;
    // 마우스 클릭시 painting 상태 = true
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
// color 버튼을 클릭하면, 버튼의 배경색을 color 변수로 저장
// color 변수를 stroke, fill의 색깔로 설정

function handleModeClick(){
    if (filling === true) {
        filling = false
        mode.innerText = "Fill"
    // failling = true일 때 값을 바꾸고, mode 버튼에 Fill을 표시
    } else {
        filling = true
        mode.innerText = "Paint"
    }
    // filling = false일 때 값을 바꾸고, mode 버튼에 Paint를 표시 
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
// fillRect (x, y, width, height)
// canvas에서 x, y 좌표부터 width, height 크기를 색깔로 채움

function handleCM(event) {
    event.preventDefault()
}
// contextmenu 이벤트 발생 시 (우클릭 시) 메뉴가 뜨는 것을 방지하는 함수

function handleSaveClick(){
    const image = canvas.toDataURL()
    // image 변수에 canvas의 데이터를 jpeg에 저장한 URL을 저장
    const link = document.createElement("a")
    link.href = image
    // link의 하이퍼링크 주소는 image
    link.download = "PaintJS"
    // link의 파일을 다운로드 시 저장되는 파일 이름은 PaintJS
    link.click()
    // save 버튼을 클릭하면 link 엘리먼트가 실행 (href 열고 PaintJS.jpeg 파일을 다운로드)
}


if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    // canvas 위에서 마우스의 움직임을 이벤트로 인식
    canvas.addEventListener("mousedown", startPainting);
    // 마우스 클릭시 이벤트 발생
    canvas.addEventListener("mouseup", stopPainting);
    // 마우스 클릭 해제시 이벤트 발생
    canvas.addEventListener("mouseleave", stopPainting);
    // 마우스가 canvas 밖으로 나갔을 때, stopPainting 함수 실행
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick))
// Array.from : object로부터 array를 생성

function handleRangeChange(event) {
    const size = event.target.value
    ctx.lineWidth = size;
}
// bar input으로 들어온 value를 size 값으로 저장 후, lineWidth로 설정

if (range) {
    range.addEventListener("input", handleRangeChange)
}
// range 버튼을 조절하여 input이 들어오면 handleRangeChange 함수 실행

if (mode) {
    mode.addEventListener("click", handleModeClick)
}
// fill mode 버튼을 클릭하면 handleModeClick 함수 실행
if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}
// save 버튼을 누를 때 handleSaveClick 함수 실행