window.onload = () => {
    const form1 = document.querySelector("#addForm");
    const items = document.getElementById("items");
    const submit = document.getElementById("submit");
    let editItem = null;

    form1.addEventListener("submit", addItem);
    items.addEventListener("click", handleItemActions);
};

function addItem(e) {
    e.preventDefault();
    const itemInput = document.getElementById("item");
    const newItem = itemInput.value.trim();

    if (newItem === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a valid task!'
        });
        return;
    }

    if (submit.value === "EDIT") {
        editItem.target.parentNode.childNodes[0].data = newItem;
        Swal.fire({
            icon: 'success',
            title: 'Edited!',
            text: 'Task edited successfully',
            showConfirmButton: false,
            timer: 1500
        });
        resetForm();
        return;
    }

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.appendChild(document.createTextNode(newItem));

    const actionButtons = createActionButtonGroup();
    li.appendChild(actionButtons);

    items.appendChild(li);

    Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Task added successfully',
        showConfirmButton: false,
        timer: 1500
    });

    resetForm();
}

function createActionButtonGroup() {
    const buttonGroup = document.createElement("div");

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm ml-2 delete";
    deleteButton.appendChild(document.createTextNode("Delete"));

    const editButton = document.createElement("button");
    editButton.className = "btn btn-success btn-sm ml-2 edit";
    editButton.appendChild(document.createTextNode("Edit"));

    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(deleteButton);

    return buttonGroup;
}

function handleItemActions(e) {
    if (e.target.classList.contains("delete")) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const li = e.target.closest("li");
                items.removeChild(li);
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Task deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    } else if (e.target.classList.contains("edit")) {
        const li = e.target.closest("li");
        document.getElementById("item").value = li.childNodes[0].data;
        submit.value = "EDIT";
        editItem = e;
    }
}

function toggleButton(ref, btnID) {
    const submitButton = document.getElementById(btnID);
    submitButton.disabled = ref.value.trim() === "";
}

function resetForm() {
    document.getElementById("item").value = "";
    submit.value = "Submit";
}
