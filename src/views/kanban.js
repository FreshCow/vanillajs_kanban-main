// DOM selectors
const toDoUl = document.querySelector(".to-do");
const inProgressUl = document.querySelector(".in-progress");
const doneUl = document.querySelector(".done");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".modal-overlay");

import toDoView from "../views/todo";
import modalView from "../views/modal";

export default class Kanban {
	constructor(storage) {
		this.storage = storage;
		this.dragToDo = null;
	}

	// 칸반보드 렌더링
	render() {
		const toDoList = this.storage.read();
		if (toDoList) {
			for (let i = 0; i < toDoList.length; i++) {
				const li = document.createElement("li");
				li.setAttribute("draggable", "true");
				li.innerHTML = toDoView(toDoList[i]);

				if (
					toDoList[i].stage.text === "To Do" ||
					toDoList[i].stage.text === "선택"
				) {
					toDoUl.appendChild(li);
				}

				if (toDoList[i].stage.text === "In Progress") {
					inProgressUl.appendChild(li);
				}

				if (toDoList[i].stage.text === "Done") {
					doneUl.appendChild(li);
				}
			}
		}
	}

	// 모달
	show(id = null) {
		modal.classList.remove("hidden");
		overlay.classList.remove("hidden");

		if (id) {
			const data = this.storage.read().find((todo) => todo.id === id);
			const modalWindow = modalView(data);
			overlay.insertAdjacentHTML("afterend", modalWindow);
			const priority = document.querySelector("#priority");
			priority.options[data.priority.value].setAttribute("selected", true);
			stage.options[data.stage.value].setAttribute("selected", true);
			return;
		}
		const modalWindow = modalView();
		overlay.insertAdjacentHTML("afterend", modalWindow);
	}

	hide() {
		const modalWindow = document.querySelector(".modal-window");
		modal.removeChild(modalWindow);
		modal.classList.add("hidden");
	}

	inputValue() {
		const title = document.querySelector("#title");
		const pp = document.querySelector("#pp");
		const finishedDate = document.querySelector("#finishedDate");
		const finishedDate2 = document.querySelector("#finishedDate2");
		const priority = document.querySelector("#priority");
		const stage = document.querySelector("#stage");
		const contents = document.querySelector("#contents");

		const inputTitle = title.value;
		const inputpp = pp.value;
		const inputFinishedDate = finishedDate.value;
		const inputFinishedDate2 = finishedDate2.value;
		const inputPriorityText = priority.options[priority.selectedIndex].text;
		const inputPriorityValue = priority.options[priority.selectedIndex].value;
		const inputStageText = stage.options[stage.selectedIndex].text;
		const inputStageValue = stage.options[stage.selectedIndex].value;
		const inputContents = contents.value;

		// 유효성 검증
		let regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

		if (regExp.test(inputTitle) === true) {
			alert("제목에는 특수문자를 사용할 수 없습니다!");
			return;
		}

		if (inputTitle.length > 30) {
			alert("제목은 30자를 초과할 수 없습니다!");
			return;
		}

		if (regExp.test(inputContents) === true) {
			alert("내용에는 특수문자를 사용할 수 없습니다!");
			return;
		}

		if (inputContents.length > 150) {
			alert("내용은 150자를 초과할 수 없습니다!");
			return;
		}

		if (inputPriorityText === "선택") {
			alert("우선순위를 선택해주세요.");
			return;
		}

		if (inputStageText === "선택") {
			alert("상태를 선택해주세요.");
			return;
		}

		function getRandomId(min, max) {
			return (Math.floor(Math.random() * (max - min) + 1) + min).toString();
		}

		let today = new Date();
		const year = today.getFullYear();
		const month = `0${today.getMonth() + 1}`.slice(-2);
		const date = `0${today.getDate()}`.slice(-2);

		today = `${year}-${month}-${date}`;

		return {
			id: getRandomId(1, 1000000),
			title: inputTitle,
			createdDate: inputpp,
			finishedDate: inputFinishedDate,
			finishedDate2: inputFinishedDate2,
			priority: { text: inputPriorityText, value: inputPriorityValue },
			stage: { text: inputStageText, value: inputStageValue },
			contents: inputContents,
		};
	}

	// 투두 카드 추가
	addToDo() {
		const toDo = this.inputValue();

		if (toDo) {
			const newToDo = document.createElement("li");
			newToDo.setAttribute("draggable", "true");
			newToDo.innerHTML = toDoView(toDo);

			if (toDo.stage.text === "To Do" || toDo.stage.text === "선택") {
				toDoUl.appendChild(newToDo);
			}

			if (toDo.stage.text === "In Progress") {
				inProgressUl.appendChild(newToDo);
			}

			if (toDo.stage.text === "Done") {
				doneUl.appendChild(newToDo);
			}
		}
		return toDo;
	}

	// 투두 카드 수정
	updateToDo(id) {
		let updatedEl = document.querySelector(`[data-id="${id}"]`).parentNode;
		const updatedData = this.inputValue();
		updatedEl.innerHTML = toDoView(updatedData);

		if (updatedData.stage === "To Do" || updatedData.stage === "선택") {
			toDoUl.appendChild(updatedEl);
		}

		if (updatedData.stage === "In Progress") {
			inProgressUl.appendChild(updatedEl);
		}

		if (updatedData.stage === "Done") {
			doneUl.appendChild(updatedEl);
		}

		return updatedData;
	}

	// 투두 카드 삭제
	deleteToDo(id) {
		const data = this.storage.read().find((todo) => todo.id === id);
		let deleteEl = document.querySelector(`[data-id="${id}"]`).parentNode;
		if (deleteEl) {
			if (data.stage.text === "To Do" || data.stage.text === "선택") {
				toDoUl.removeChild(deleteEl);
			}

			if (data.stage.text === "In Progress") {
				inProgressUl.removeChild(deleteEl);
			}

			if (data.stage.text === "Done") {
				doneUl.removeChild(deleteEl);
			}
		}
	}

	// 칸반보드 정렬
	sortToDo(selectedValue) {
		const toDoList = this.storage.read();
		if (selectedValue === "highest") {
			toDoList.sort((a, b) => a.priority.value - b.priority.value);
		}

		if (selectedValue === "lowest") {
			toDoList.sort((a, b) => b.priority.value - a.priority.value);
		}

		toDoUl.innerHTML = "";
		inProgressUl.innerHTML = "";
		doneUl.innerHTML = "";

		for (let i = 0; i < toDoList.length; i++) {
			if (
				toDoList[i].stage.text === "To Do" ||
				toDoList[i].stage.text === "선택"
			) {
				const li = document.createElement("li");
				li.setAttribute("draggable", "true");
				li.innerHTML = toDoView(toDoList[i]);
				toDoUl.appendChild(li);
			}

			if (toDoList[i].stage.text === "In Progress") {
				const li = document.createElement("li");
				li.setAttribute("draggable", "true");
				li.innerHTML = toDoView(toDoList[i]);
				inProgressUl.appendChild(li);
			}

			if (toDoList[i].stage.text === "Done") {
				const li = document.createElement("li");
				li.setAttribute("draggable", "true");
				li.innerHTML = toDoView(toDoList[i]);
				doneUl.appendChild(li);
			}
		}
	}

	// Drag and Drop
	dragStart(target) {
		this.dragToDo = target;
		this.dragToDo.classList.add("dragged");
	}

	dragEnd() {
		this.dragToDo.classList.remove("dragged");
	}

	dragEnter(target) {
		// target.style.background = "#bdbdbd";
	}

	// dragOver(targets) {
	//     console.log(targets);
	// }

	dragLeave(target) {
		target.remove;
		target.style.background = "";
	}

	dragDrop(target) {
		const stage = target.previousElementSibling.innerText;
		const data = this.storage
			.read()
			.find((todo) => todo.id === this.dragToDo.children[0].dataset.id);
		data.stage.text = stage;

		if (stage === "To Do") data.stage.value = 1;
		if (stage === "In Progress") data.stage.value = 2;
		if (stage === "Done") data.stage.value = 3;

		target.appendChild(this.dragToDo);
		target.style.background = "";

		return data;
	}
}
