const { createEditor, createToolbar } = window.wangEditor;

const editorConfig = {
    placeholder: "请再次输入...",
};

function getHtmlContent() {
    const content = document
        .querySelector("meta[name='content']")
        .getAttribute("content");
    return content || "<p><br></p>";
}
function getTitle() {
    const title = document
        .querySelector("meta[name='title']")
        .getAttribute("content");
    return title;
}

const editor = createEditor({
    selector: "#editor-container",
    html: getHtmlContent(),
    config: editorConfig,
    mode: "default", // or 'simple'
});

const toolbarConfig = {};

const toolbar = createToolbar({
    editor,
    selector: "#toolbar-container",
    config: toolbarConfig,
    mode: "default", // or 'simple'
});

const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", async () => {
    const content = editor.getHtml();
    await fetch("/post", {
        method: "post",
        body: JSON.stringify({ content, title: getTitle() }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    window.location.replace("/");
});
