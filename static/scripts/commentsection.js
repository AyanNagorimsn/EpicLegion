let userId = localStorage.getItem("user_id");
let repliesShown = {};

function updateComments(sortBy = "likes", selectedElement = null) {
    userId = localStorage.getItem("user_id");
    if (userId == undefined || userId == null) {
        updateCommentsLikes([], sortBy, selectedElement);
    } else {
        fetch("api/v1/users/" + userId + "/likes")
            .then((res) => res.json())
            .then((likes) => {
                console.log(likes);
                let likesArray = likes.map((like) => like.comment_id);
                console.log(likesArray);
                updateCommentsLikes(likesArray, sortBy, selectedElement);
            });
    }
}

function updateCommentsLikes(
    likesArray,
    sortBy = "likes",
    selectedElement = null
) {
    fetch("api/v1/comments/")
        // fetch("https://cors-anywhere.herokuapp.com/https://markpacks.net/api/v1/comments/")
        .then((res) => res.json())
        .then((messages) => {
            let messagesArray = Object.entries(messages).map(
                ([key, value]) => ({
                    key,
                    ...value,
                })
            );
            messagesArray.sort((a, b) => {
                if (sortBy === "newest") {
                    return (
                        new Date(b.creation_time).getTime() -
                        new Date(a.creation_time).getTime()
                    );
                } else if (sortBy === "oldest") {
                    return (
                        new Date(a.creation_time).getTime() -
                        new Date(b.creation_time).getTime()
                    );
                } else if (sortBy === "likes") {
                    return b.total_likes - a.total_likes;
                } else {
                    return 0;
                }
            });
            let comments = document
                .getElementById("commentSection")
                .getElementsByClassName("comment");
            while (comments.length > 0) {
                comments[0].remove();
            }
            if (selectedElement !== null) {
                let sortByOptions =
                    document.getElementById("sortByOptions").children;
                for (let i = 0; i < sortByOptions.length; i++) {
                    sortByOptions[i].classList.remove("sortBySelected");
                }
                selectedElement.classList.add("sortBySelected");
            }
            console.log(messagesArray);
            let numComments = 0;
            messagesArray.forEach((message) => {
                addMessage(message, likesArray);
                numComments++;
                numComments += howManyChildren(message);
            });
            document.querySelector(".numOfComments").textContent =
                numComments + " Comments";
        });
}

function addMessage(message, likes) {
    if (message["parent_id"] == null) {
        let ddate = new Date(message["creation_time"]);
        let newMessage = document
            .getElementById("commentSection")
            .appendChild(document.createElement("div"));
        let newMessageID = message["comment_id"];
        let newContent = message["content"];
        let newUsername = message["username"];
        let newUserID = message["user_id"];
        let newLikes = message["total_likes"];
        let newReplies = howManyChildren(message);
        let pfpSrc = `api/v1/users/${newUserID}/profile-pictures`;
        let newDate =
            "&nbsp;" +
            (ddate.getMonth() + 1) +
            "/" +
            ddate.getDate() +
            "/" +
            ddate.getFullYear();
        newMessage.classList.add("comment");
        newMessage.classList.add(newMessageID);
        if (newReplies > 0) {
            newMessage.classList.add("hasReplies");
        }
        let commentPFP = newMessage.appendChild(document.createElement("div"));
        commentPFP.classList.add("commentedPFP");
        commentPFP
            .appendChild(document.createElement("img"))
            .setAttribute("src", pfpSrc);
        let commentParagraphContainer = newMessage.appendChild(
            document.createElement("div")
        );
        commentParagraphContainer.classList.add("commentParagraphContainer");
        let commentBody = commentParagraphContainer.appendChild(
            document.createElement("div")
        );
        commentBody.classList.add("commentBody");
        commentBody.onmouseover = function () {
            showCommentButtons(newMessage);
        };
        commentBody.onmouseout = function () {
            hideCommentButtons(newMessage);
        };
        let username = commentBody.appendChild(document.createElement("div"));
        username.classList.add("username");
        username.textContent = newUsername;
        let date = username.appendChild(document.createElement("div"));
        date.classList.add("date");
        date.innerHTML = newDate;
        let moreButton = username.appendChild(document.createElement("div"));
        moreButton.classList.add("moreButton");
        moreButton.onclick = function () {
            expandMoreButton(event, moreButton);
        };
        moreButton
            .appendChild(document.createElement("img"))
            .setAttribute("src", "static/images/more.png");
        let dropdownContent = moreButton.appendChild(
            document.createElement("div")
        );
        dropdownContent.classList.add("dropdown-content");
        let editButton = dropdownContent.appendChild(
            document.createElement("a")
        );
        editButton.textContent = "Edit";
        editButton.onclick = function () {
            editButtonClicked(commentBody);
        };
        let deleteButton = dropdownContent.appendChild(
            document.createElement("a")
        );
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            fetch(`api/v1/comments/${newMessageID}`, {
                method: "DELETE",
            }).then(updateComments);
        };
        moreButton.style.visibility = "hidden";
        if (newUserID != userId) {
            moreButton.style.display = "none";
        }
        let commentParagraph = commentBody.appendChild(
            document.createElement("div")
        );
        commentParagraph.classList.add("commentParagraph");
        commentParagraph.textContent = newContent;
        let likeReplyReportContainer = commentBody.appendChild(
            document.createElement("div")
        );
        likeReplyReportContainer.classList.add("likeReplyReportContainer");
        let likeButton = likeReplyReportContainer.appendChild(
            document.createElement("div")
        );
        likeButton.classList.add("likeButton");
        let likeButtonIMG = likeButton.appendChild(
            document.createElement("img")
        );
        // FIX
        if (likes.includes(newMessageID)) {
            likeButtonIMG.setAttribute(
                "src",
                "static/images/likebuttonActive.png"
            );
        } else {
            likeButtonIMG.setAttribute("src", "static/images/likebutton.png");
        }
        likeButtonIMG.onclick = function () {
            toggleLike(newMessageID);
        };
        let likeNumber = likeReplyReportContainer.appendChild(
            document.createElement("div")
        );
        likeNumber.classList.add("likeNumber");
        likeNumber.textContent = newLikes;
        let replyButton = likeReplyReportContainer.appendChild(
            document.createElement("div")
        );
        replyButton.classList.add("replyButton");
        replyButton.textContent = "REPLY";
        let confirmEditButton = likeReplyReportContainer.appendChild(
            document.createElement("div")
        );
        confirmEditButton.classList.add("confirmEditButton");
        confirmEditButton.textContent = "CONFIRM";
        confirmEditButton.onclick = function () {
            confirmEditButtonClicked(
                commentParagraph,
                likeReplyReportContainer
            );
        };
        confirmEditButton.style.display = "none";
        let cancelEditButton = likeReplyReportContainer.appendChild(
            document.createElement("div")
        );
        cancelEditButton.classList.add("cancelEditButton");
        cancelEditButton.textContent = "CANCEL";
        cancelEditButton.onclick = function () {
            cancelEditButtonClicked(commentParagraph, likeReplyReportContainer);
        };
        cancelEditButton.style.display = "none";
        let typeBox = commentBody.appendChild(document.createElement("div"));
        typeBox.classList.add("typeBox");
        typeBox.style.display = "none";
        replyButton.onclick = function () {
            showReplyField(typeBox);
        };
        let replypfpcommentBox = typeBox.appendChild(
            document.createElement("div")
        );
        replypfpcommentBox.classList.add("replypfpcommentBox");
        let replyPFP = replypfpcommentBox.appendChild(
            document.createElement("div")
        );
        replyPFP.classList.add("replyPFP");
        replyPFP
            .appendChild(document.createElement("img"))
            .setAttribute(
                "src",
                userId == undefined || userId == null
                    ? "static/images/beforeSignInCommentPFP.png"
                    : `api/v1/users/${userId}/profile-pictures`
            );
        let replyForm = typeBox.appendChild(document.createElement("div"));
        replyForm.classList.add("replyForm");
        let replyCommentBox = replyForm.appendChild(
            document.createElement("input")
        );
        replyCommentBox.classList.add("replyCommentBox");
        replyCommentBox.placeholder = "Reply Here";
        replyCommentBox.oninput = function () {
            disableCommentButton(replyCommentBox);
        };
        let replySubmitButtonRow = replyForm.appendChild(
            document.createElement("div")
        );
        replySubmitButtonRow.classList.add("replySubmitButtonRow");
        let replyCancelButton = replySubmitButtonRow.appendChild(
            document.createElement("input")
        );
        replyCancelButton.classList.add("replyCancelButton");
        replyCancelButton.type = "button";
        replyCancelButton.value = "Cancel";
        let replySubmitButton = replySubmitButtonRow.appendChild(
            document.createElement("input")
        );
        replySubmitButton.classList.add("replySubmitButton");
        replySubmitButton.type = "button";
        replySubmitButton.value = "Comment";
        replySubmitButton.disabled = true;
        replyCancelButton.onclick = function () {
            hideReplyField(typeBox);
        };
        replySubmitButton.onclick = function () {
            writeReply(replySubmitButton, newMessageID);
        };
        let reportButton = likeReplyReportContainer.appendChild(
            document.createElement("div")
        );
        reportButton.classList.add("reportButton");
        reportButton
            .appendChild(document.createElement("img"))
            .setAttribute("src", "static/images/reportButton.png");
        // for (let i = 0; i < message["children_ids"].length; i++) {
        //     addReply(i, newMessage, message["children_ids"][i][Object.keys(message["children_ids"][i])[0]], false, likes);
        // }
        let i = 0;
        for (let j = 0; j < message["children_ids"].length; j++) {
            addReply(
                i,
                newMessage,
                message["children_ids"][j][
                    Object.keys(message["children_ids"][j])[0]
                ],
                false,
                likes
            );
            i +=
                howManyChildren(
                    message["children_ids"][j][
                        Object.keys(message["children_ids"][j])[0]
                    ]
                ) + 1;
        }
        if (newReplies > 0) {
            let viewReplies = commentParagraphContainer.appendChild(
                document.createElement("div")
            );
            viewReplies.classList.add("viewReplies");
            if (
                repliesShown.hasOwnProperty(newMessageID) &&
                repliesShown[newMessageID] != 0
            ) {
                if (repliesShown[newMessageID] >= howManyChildren(message)) {
                    viewReplies.textContent = "── hide replies";
                } else {
                    viewReplies.textContent = "── view more replies";
                }
            } else {
                viewReplies.textContent = `── view ${newReplies} replies`;
            }
            viewReplies.onclick = function () {
                viewRepliesClicked(newMessage);
            };
        }
    }
}

function addReply(index, parent, message, replyOfReply, likes) {
    let ddate = new Date(message["creation_time"]);
    let newContent = message["content"];
    let newUsername = message["username"];
    let newUserID = message["user_id"];
    let newLikes = message["total_likes"];
    let pfpSrc = `api/v1/users/${newUserID}/profile-pictures`;
    let newDate =
        "&nbsp;" +
        (ddate.getMonth() + 1) +
        "/" +
        ddate.getDate() +
        "/" +
        ddate.getFullYear();
    if (replyOfReply !== false) {
        newContent = "@" + replyOfReply + " " + newContent;
    }
    console.log(index, newContent);
    let parentParagraph = parent.getElementsByClassName(
        "commentParagraphContainer"
    )[0];
    let newMessage = parentParagraph.appendChild(document.createElement("div"));
    let newMessageID = message["comment_id"];
    newMessage.classList.add("replyCommentContainer");
    newMessage.classList.add(newMessageID);
    if (
        !repliesShown.hasOwnProperty(parent.classList[1]) ||
        index >= repliesShown[parent.classList[1]]
    ) {
        newMessage.classList.add("collapsed");
    }
    newMessage.onmouseover = function () {
        showCommentButtons(newMessage);
    };
    newMessage.onmouseout = function () {
        hideCommentButtons(newMessage);
    };
    let commentPFP = newMessage.appendChild(document.createElement("div"));
    commentPFP.classList.add("replyPFP");
    commentPFP
        .appendChild(document.createElement("img"))
        .setAttribute("src", pfpSrc);
    commentParagraphContainer = newMessage.appendChild(
        document.createElement("div")
    );
    commentParagraphContainer.classList.add("commentParagraphContainer");
    let username = commentParagraphContainer.appendChild(
        document.createElement("div")
    );
    username.classList.add("username");
    username.textContent = newUsername;
    let date = username.appendChild(document.createElement("div"));
    date.classList.add("date");
    date.innerHTML = newDate;
    let moreButton = username.appendChild(document.createElement("div"));
    moreButton.classList.add("moreButton");
    moreButton.onclick = function () {
        expandMoreButton(event, moreButton);
    };
    moreButton
        .appendChild(document.createElement("img"))
        .setAttribute("src", "static/images/more.png");
    let dropdownContent = moreButton.appendChild(document.createElement("div"));
    dropdownContent.classList.add("dropdown-content");
    let editButton = dropdownContent.appendChild(document.createElement("a"));
    editButton.textContent = "Edit";
    editButton.onclick = function () {
        editButtonClicked(commentBody);
    };
    let deleteButton = dropdownContent.appendChild(document.createElement("a"));
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        fetch(`api/v1/comments/${newMessageID}`, {
            method: "DELETE",
        }).then(updateComments);
    };
    moreButton.style.visibility = "hidden";
    if (newUserID != userId) {
        moreButton.style.display = "none";
    }
    moreButton.style.visibility = "hidden";
    if (newUserID != userId) {
        moreButton.style.display = "none";
    }
    let commentParagraph = commentParagraphContainer.appendChild(
        document.createElement("div")
    );
    commentParagraph.classList.add("commentParagraph");
    commentParagraph.textContent = newContent;
    let likeReplyReportContainer = commentParagraphContainer.appendChild(
        document.createElement("div")
    );
    likeReplyReportContainer.classList.add("likeReplyReportContainer");
    let likeButton = likeReplyReportContainer.appendChild(
        document.createElement("div")
    );
    likeButton.classList.add("likeButton");
    let likeButtonIMG = likeButton.appendChild(document.createElement("img"));
    if (likes.includes(newMessageID)) {
        likeButtonIMG.setAttribute("src", "static/images/likebuttonActive.png");
    } else {
        likeButtonIMG.setAttribute("src", "static/images/likebutton.png");
    }
    likeButtonIMG.onclick = function () {
        toggleLike(newMessageID);
    };
    let likeNumber = likeReplyReportContainer.appendChild(
        document.createElement("div")
    );
    likeNumber.classList.add("likeNumber");
    likeNumber.textContent = newLikes;
    let replyButton = likeReplyReportContainer.appendChild(
        document.createElement("div")
    );
    replyButton.classList.add("replyButton");
    replyButton.textContent = "REPLY";
    let confirmEditButton = likeReplyReportContainer.appendChild(
        document.createElement("div")
    );
    confirmEditButton.classList.add("confirmEditButton");
    confirmEditButton.textContent = "CONFIRM";
    confirmEditButton.onclick = function () {
        confirmEditButtonClicked(commentParagraph, likeReplyReportContainer);
    };
    confirmEditButton.style.display = "none";
    let cancelEditButton = likeReplyReportContainer.appendChild(
        document.createElement("div")
    );
    cancelEditButton.classList.add("cancelEditButton");
    cancelEditButton.textContent = "CANCEL";
    cancelEditButton.onclick = function () {
        cancelEditButtonClicked(commentParagraph, likeReplyReportContainer);
    };
    cancelEditButton.style.display = "none";
    let typeBox = commentParagraphContainer.appendChild(
        document.createElement("div")
    );
    typeBox.classList.add("typeBox");
    typeBox.style.display = "none";
    replyButton.onclick = function () {
        showReplyField(typeBox);
    };
    let replypfpcommentBox = typeBox.appendChild(document.createElement("div"));
    replypfpcommentBox.classList.add("replypfpcommentBox");
    let replyPFP = replypfpcommentBox.appendChild(
        document.createElement("div")
    );
    replyPFP.classList.add("replyPFP");
    replyPFP
        .appendChild(document.createElement("img"))
        .setAttribute(
            "src",
            userId == undefined || userId == null
                ? "static/images/beforeSignInCommentPFP.png"
                : `api/v1/users/${userId}/profile-pictures`
        );
    let replyForm = typeBox.appendChild(document.createElement("div"));
    replyForm.classList.add("replyForm");
    let replyCommentBox = replyForm.appendChild(
        document.createElement("input")
    );
    replyCommentBox.classList.add("replyCommentBox");
    replyCommentBox.placeholder = "Reply Here";
    replyCommentBox.oninput = function () {
        disableCommentButton(replyCommentBox);
    };
    let replySubmitButtonRow = replyForm.appendChild(
        document.createElement("div")
    );
    replySubmitButtonRow.classList.add("replySubmitButtonRow");
    let replyCancelButton = replySubmitButtonRow.appendChild(
        document.createElement("input")
    );
    replyCancelButton.classList.add("replyCancelButton");
    replyCancelButton.type = "button";
    replyCancelButton.value = "Cancel";
    let replySubmitButton = replySubmitButtonRow.appendChild(
        document.createElement("input")
    );
    replySubmitButton.classList.add("replySubmitButton");
    replySubmitButton.type = "button";
    replySubmitButton.value = "Comment";
    replySubmitButton.disabled = true;
    replyCancelButton.onclick = function () {
        hideReplyField(typeBox);
    };
    replySubmitButton.onclick = function () {
        writeReply(replySubmitButton, newMessageID);
    };
    let reportButton = likeReplyReportContainer.appendChild(
        document.createElement("div")
    );
    reportButton.classList.add("reportButton");
    reportButton
        .appendChild(document.createElement("img"))
        .setAttribute("src", "static/images/reportButton.png");
    // for (let i = 0; i < message["children_ids"].length; i++) {
    //     addReply(index + i, parent, message["children_ids"][i][Object.keys(message["children_ids"][i])[0]], true, likes);
    // }
    let i = 0;
    for (let j = 0; j < message["children_ids"].length; j++) {
        i++;
        addReply(
            i + index,
            parent,
            message["children_ids"][j][
                Object.keys(message["children_ids"][j])[0]
            ],
            newUsername,
            likes
        );
        i += howManyChildren(
            message["children_ids"][j][
                Object.keys(message["children_ids"][j])[0]
            ]
        );
    }
}

function writeComment() {
    let commentBox = document.getElementById("commentBox");
    let comment = commentBox.value;
    let form = new FormData();
    form.append("content", comment);
    fetch("api/v1/comments/", {
        method: "POST",
        body: form,
    }).then((res) => {
        console.log(res);
        updateComments();
    });
}

function writeReply(submitButton, parentID) {
    let likeReplyReportContainer = submitButton.parentElement.parentElement;
    let replyBox =
        likeReplyReportContainer.getElementsByClassName("replyBox")[0];
    let reply = replyBox.value;
    let replyForm = new FormData();
    replyForm.append("content", reply);
    fetch("api/v1/comments/" + parentID, {
        method: "POST",
        body: replyForm,
    }).then(updateComments());
}

function showCommentButtons(parentElement) {
    if (
        parentElement.getElementsByClassName("replyCommentContainer").length >
            0 &&
        parentElement
            .getElementsByClassName("replyCommentContainer")[0]
            .matches(":hover")
    ) {
        return;
    }
    let reportButton = parentElement.getElementsByClassName("reportButton")[0];
    let moreButton = parentElement.getElementsByClassName("moreButton")[0];
    reportButton.style.visibility = "visible";
    moreButton.style.visibility = "visible";
}

function hideCommentButtons(parentElement) {
    let reportButton = parentElement.getElementsByClassName("reportButton")[0];
    let moreButton = parentElement.getElementsByClassName("moreButton")[0];
    if (!moreButton.classList.contains("moreButtonExpanded")) {
        reportButton.style.visibility = "hidden";
        moreButton.style.visibility = "hidden";
    }
}

function showReplyField(typeBox) {
    typeBox.style.display = "flex";
    let likeReplyReportContainer = typeBox.parentElement.getElementsByClassName(
        "likeReplyReportContainer"
    )[0];
    let replyButton =
        likeReplyReportContainer.getElementsByClassName("replyButton")[0];
    replyButton.style.display = "none";
}

function hideReplyField(typeBox) {
    typeBox.style.display = "none";
    let likeReplyReportContainer = typeBox.parentElement.getElementsByClassName(
        "likeReplyReportContainer"
    )[0];
    let replyButton =
        likeReplyReportContainer.getElementsByClassName("replyButton")[0];
    replyButton.style.display = "inline-block";
}

function expandMoreButton(e, moreButton) {
    e.stopPropagation();
    moreButton.classList.toggle("moreButtonExpanded");
}

function hideMoreButtons() {
    let moreButtons = document.getElementsByClassName("moreButton");
    for (let i = 0; i < moreButtons.length; i++) {
        moreButtons[i].classList.remove("moreButtonExpanded");
        moreButtons[i].style.visibility = "hidden";
        moreButtons[i].parentElement.parentElement.getElementsByClassName(
            "reportButton"
        )[0].style.visibility = "hidden";
    }
}

function expandSortBy() {
    let newest = document.getElementById("sortNew");
    let oldest = document.getElementById("sortOld");
    let likes = document.getElementById("sortLikes");
    let sortArrow = document.getElementById("sortArrow");
    if (newest.style.left == "0em") {
        newest.style.left = "-5em";
        oldest.style.left = "-5em";
        likes.style.left = "-5em";
        sortArrow.style.transform = "rotate(0deg)";
        return;
    }
    newest.style.left = "0em";
    oldest.style.left = "5em";
    likes.style.left = "10em";
    sortArrow.style.transform = "rotate(-90deg)";
}

function toggleLike(commentID) {
    fetch("api/v1/comments/" + commentID + "/likes", {
        method: "PUT",
    }).then(updateComments());
}

function editButtonClicked(parentElement) {
    let commentParagraph = parentElement.querySelector(".commentParagraph");
    commentParagraph.contentEditable = true;
    commentParagraph.focus();
    let likeReplyReportContainer = parentElement.querySelector(
        ".likeReplyReportContainer"
    );
    let confirmEditButton =
        likeReplyReportContainer.querySelector(".confirmEditButton");
    confirmEditButton.style.display = "inline-block";
    let cancelEditButton =
        likeReplyReportContainer.querySelector(".cancelEditButton");
    cancelEditButton.style.display = "inline-block";
    let replyButton = likeReplyReportContainer.querySelector(".replyButton");
    replyButton.style.display = "none";
}

function confirmEditButtonClicked(commentText, likeReplyReportContainer) {
    likeReplyReportContainer.querySelector(".confirmEditButton").style.display =
        "none";
    likeReplyReportContainer.querySelector(".cancelEditButton").style.display =
        "none";
    likeReplyReportContainer.querySelector(".replyButton").style.display =
        "inline-block";
    let commentID =
        commentText.parentElement.parentElement.parentElement.classList[1];
    let form = new FormData();
    form.append("content", commentText.textContent);
    fetch("api/v1/comments/" + commentID, {
        method: "PATCH",
        body: form,
    }).then(updateComments());
}

function cancelEditButtonClicked(commentText, likeReplyReportContainer) {
    likeReplyReportContainer.querySelector(".confirmEditButton").style.display =
        "none";
    likeReplyReportContainer.querySelector(".cancelEditButton").style.display =
        "none";
    likeReplyReportContainer.querySelector(".replyButton").style.display =
        "inline-block";
    commentText.contentEditable = false;
    updateComments();
}

function howManyChildren(parentComment) {
    if (parentComment["children_ids"].length == 0) {
        return 0;
    }
    let count = parentComment["children_ids"].length;
    for (let i = 0; i < parentComment["children_ids"].length; i++) {
        count += howManyChildren(
            parentComment["children_ids"][i][
                Object.keys(parentComment["children_ids"][i])[0]
            ]
        );
    }
    return count;
}

function viewRepliesClicked(parentComment) {
    if (
        repliesShown.hasOwnProperty(parentComment.classList[1]) &&
        repliesShown[parentComment.classList[1]] >=
            parentComment.getElementsByClassName("replyCommentContainer").length
    ) {
        repliesShown[parentComment.classList[1]] = 0;
    } else if (repliesShown.hasOwnProperty(parentComment.classList[1])) {
        repliesShown[parentComment.classList[1]] += Math.min(
            5,
            parentComment.querySelectorAll(".replyCommentContainer.collapsed")
                .length
        );
    } else {
        repliesShown[parentComment.classList[1]] = Math.min(
            5,
            parentComment.querySelectorAll(".replyCommentContainer.collapsed")
                .length
        );
    }
    console.log(repliesShown);
    updateComments();
}

function disableCommentButton(inputField) {
    let confirmbutton =
        inputField.parentElement.getElementsByClassName("replySubmitButton")[0];
    if (inputField.value == "" || inputField.value == null) {
        confirmbutton.disabled = true;
    } else {
        confirmbutton.disabled = false;
    }
}

document.addEventListener("loaded", function () {
    updateComments();
});

const openModal = document.querySelectorAll(".reportButton");

for (let i = 0; i < openModal.length; i++)
    openModal[i].addEventListener("click", function () {
        console.log("Button clicked");
    });
