function save()
{
    let title_text = document.getElementById("title");
    let content_text = document.getElementById("content");

    let title = title_text.value;
    let content = content_text.value;
    let id = localStorage.length;

    title_text.value = "";
    content_text.value = "";

    let save_content = 
    {
        "id": id,
        "title": title,
        "content": content
    };

    let json = JSON.stringify(save_content);
    localStorage.setItem(save_content.id, json);  
    
    add_option();
}

function add_option()
{
    let selet = document.getElementById("select");
    selet.innerHTML = "<option value='-1'>選択してください</option>";
    for(let i = 0; i < localStorage.length; i++)
    {
        let option = document.createElement("option");
        let json = JSON.parse(localStorage.getItem(i));
        option.text = json.title;
        option.value = json.id;
        // console.log(json);
        selet.add(option);
    }

}

function load()
{
    let id = document.getElementById("select").value;
    if(id == -1)
    {
        alert("項目を選択してください");
        return;
    }
    let json = JSON.parse(localStorage.getItem(id));
    let field = document.getElementById("field");

    let str = json.content;
    str = str.replace(/\n/g, "<br>");

    str = str.replace(/~(.*?)~/g, (match) =>
    {
        return "<span class=\"hidden\" onclick=\"show_text(\'" + match + "\')\">＊＊＊</span>";
    }
    );

    field.innerHTML = str;
}

function delete_data()
{
    localStorage.clear();
    add_option();
}

var flag = {

};

function show_text(text)
{
    let element = event.target;

    if(flag[text] == undefined)
        flag[text] = false;
    
    if(!flag[text])
        element.textContent = text;
    else
        element.textContent = "＊＊＊";
    flag[text] = !flag[text];
    console.log(flag);
}

window.onload = function()
{
    add_option();
};

var file = document.getElementById("set_file");
file.addEventListener("change", () =>
{
    let textarea = document.getElementById("content");
    let render = new FileReader();
    render.readAsText(file.files[0]);
    render.onload = () =>
    {
        // console.log(render.result);
        textarea.value = render.result;
    }

});
