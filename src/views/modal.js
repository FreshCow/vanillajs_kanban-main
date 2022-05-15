export default function modal(toDoData = null) {
	return `
        <div class="modal-window">
        <div class="closeBtn">
        x
        </div>
        <div class="modal-form" data-id=${toDoData === null ? "" : toDoData.id}>
            <div>
                <input type="color">
            </div>
            <div>
                <label for="title">제목</label>
                <input id="title" type="text" value=${
									toDoData === null ? "" : toDoData.title
								}>
            </div>
            <div class="sst">
                <span>
                    <label for="finishedDate">요청자</label>
                    <input id="pp" type="text" value=${
									toDoData === null ? "" : toDoData.finishedDate
								}>
                </span>
                <span>
                    <label for="finishedDate">담당자</label>
                    <input id="finishedDate" type="text" value=${
									toDoData === null ? "" : toDoData.finishedDate
								}>
                </span>
            </div>
            
            <div class="select-h">
                <span>
                    <label for="priority">우선순위</label>
                    <select id="priority" name="priority" onselect=${
											toDoData === null ? "" : toDoData.priority.text
										}>
                        <option value="" disabled selected>선택</option>
                        <option value="1">높음</option>
                        <option value="2">중간</option>
                        <option value="3">낮음</option>
                    </select>
                </span>
                <span>
                    <label for="stage">정리</label>
                    <select id="stage" name="stage" onselect=${
											toDoData === null ? "" : toDoData.stage
										}>
                        <option value="" disabled  selected>선택</option>
                        <option value="1">To Do</option>
                        <option value="2">Doing</option>
                        <option value="3">Done</option>
                    </select>
                </span>
            </div>

            <div>
                <label>기한</label>
                <input id="finishedDate2" type="date" value=${toDoData === null ? "" : toDoData.finishedDate}>
            </div> 


            <div>
                <label for="contents"></label>
                <textarea id="contents" placeholder="내용을 입력하세요." rows="10">${
									toDoData === null ? "" : toDoData.contents
								}</textarea>
            </div>
            <div class="btn-row">
                <button class=${
									toDoData === null ? "submitBtn-add" : "submitBtn-update"
								} type="button">작성 완료</button>
            </div>
        </div>
    </div>      
    `;
}



{/* <div>
                <label for="finishedDate">완료일</label>
                <input id="finishedDate" type="date" value=${
									toDoData === null ? "" : toDoData.finishedDate
								}>
            </div> */}