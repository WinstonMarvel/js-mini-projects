const dummyData = [
	{
		isEnabled: true,
		emailId: "test@te.com", 
	},
	{
		isEnabled: true,
		emailId: "4asdsad@asd.com", 
	},
	{
		isEnabled: false,
		emailId: "js2d@jsdf.com", 
	}
];

var addEmailInput = document.getElementById("email");
var addEmailButton = document.getElementById("submitBtn");
var addSearchInput = document.getElementById("search");
var addSearchButton = document.getElementById("addBtn");
var output = document.getElementById("output");
var filterEnabled = document.querySelector("#filterEnabled");

function List(initialData, outputDiv, checkbox){
	this.data = initialData;
	this.toggleChecked = checkbox.checked;
	this.outputDiv = outputDiv;
	this.updateDOM(this.data);
}

List.prototype.addItem = function (isEnabled, emailId){
	this.data.push({isEnabled: isEnabled, emailId: emailId})
	this.updateDOM(this.data);
};

List.prototype.removeItem = function (id){
	this.data.splice(id, 1);
	this.updateDOM(this.data);
};

List.prototype.searchItems = function(str){
	let searchedData = this.data.filter((item) => {
		const regEx = ".*" + str + ".*";
		if(item.emailId.match(regEx)) {
			return item;
		}
	});
	this.updateDOM(searchedData);
}

List.prototype.toggle = function(){
	this.toggleChecked = !this.toggleChecked;
	this.updateDOM(this.data);
}

List.prototype.toggleRow = function(rowNumber){
	this.data[rowNumber].isEnabled = !this.data[rowNumber].isEnabled;
	this.updateDOM(this.data);
}

List.prototype.updateDOM = function(data){
	let html = `<tr>
	<th>IsEnabled</th>
	<th>Email</th>
	<th>Delete</th>
  </tr>`;
	data.map((item, index) => {
		if(!this.toggleChecked) { //Show Only enabled - DISABLED
			html = html + `<tr data-rowid="${index}">
			<td><input type="checkbox" class="toggleIsEnabled" ${item.isEnabled? "checked":""}></td>
			<td>${item.emailId}</td>
			<td>
				<span class="deleteBtn fa fa-trash " aria-hidden="true"></span>
			  </td>
		  </tr>`
		}
		else if(item.isEnabled) {
			html = html + `<tr data-rowid="${index}">
			<td><input type="checkbox" class="toggleIsEnabled" ${item.isEnabled? "checked":""}></td>
			<td>${item.emailId}</td>
			<td>
				<span class="deleteBtn fa fa-trash " aria-hidden="true"></span>
			  </td>
		  </tr>`
		}
	});
	this.outputDiv.innerHTML = html;
};

var List = new List(dummyData, output, false);

function getRowId(el) {
	if(el.dataset.rowid) {
		return el.dataset.rowid;
	} else {
		while (el.parentElement) {
			el = el.parentElement;
			if(el.dataset.rowid) {
				return el.dataset.rowid;
			}
		}
	}
}

document.addEventListener("click", function(e){
	const s = e.target.id || e.target.classList[0];
	switch(s){
		case "submitBtn":
			const email = addEmailInput.value;
			List.addItem(false, email);
			break;
		case "addBtn":
			const searchStr = addSearchInput.value;
			List.searchItems(searchStr);
			break;
		case "filterEnabled": 
			List.toggle();
			break;
		case "toggleIsEnabled":
			var rowNumber = getRowId(e.target);
			List.toggleRow(rowNumber);
			break;		
		case "deleteBtn":
			var rowNumber = getRowId(e.target);
			List.removeItem(rowNumber);
			break;	
	}
});

