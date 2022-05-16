export default function todo(data) {
	return `
            <div class='card' draggable="false" data-id=${data ? data.id : ""}> 
                <p class="card-title">제목: ${data ? data.title : ""}</p> 
                <p>아이디: ${data ? data.id : ""}</p> 
                <p>요청자: ${data ? data.createdDate : ""}</p> 
                <p>담당자: ${data ? data.finishedDate : ""}</p> 
                <p>기한: ${data ? data.finishedDate2 : "까지"}</p> 
                <p class="card-contents">${data ? data.contents : ""}</p> 
                <p class="card-btn"> 
                    <button class="updateBtn" type="button" data-id=${
											data ? data.id : ""
										}>수정</button> 
                    <button class="deleteBtn" type="button" data-id=${
											data ? data.id : ""
										}>삭제</button>
                </p>
                <span class="card-priority">${data.priority ? data.priority.text : "미선택"}</span>
                <p>
                    <div class = "card-tag" style = "background-color: blue;></div>
                </p>
            </div>
        `;
}
