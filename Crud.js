function saveToLocalStorage(event) {
    event.preventDefault()
    const name = event.target.username.value;
    const email = event.target.Email.value;
    const Phone = event.target.phoneno.value;

    const obj = {
        name,
        email,
        Phone,
    }
    //axios POST
    axios.post("https://crudcrud.com/api/e77159fa59754ed3a1edd230fd5520a7/appointment", obj)
        .then(res => onscreen(res.data))
        .catch((err) => { document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>' })
}

window.addEventListener("DOMContentLoaded", () => {
    //axios GET
    axios.get("https://crudcrud.com/api/e77159fa59754ed3a1edd230fd5520a7/appointment")
        .then(res => {
            for (var i = 0; i < res.data.length; i++) {
                onscreen(res.data[i])
                console.log(res)
            }
        })
        .catch((err) => { document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>' })
})


function onscreen(obj) {
    const Parent = document.getElementById('Details');
    //using innerHtml
    // Parent.innerHTML=Parent.innerHTML+`<li>${obj.name} - ${obj.email} - ${obj.Phone}</li>`

    // Or  
    const child = document.createElement('li');
    child.textContent = obj.name + '-' + obj.email + '-' + obj.Phone;

    // delete
    const delbtn = document.createElement('input')
    delbtn.type = "button"
    delbtn.value = 'del'

    //axios DELETE 
    var del = delbtn.onclick = () => {
        axios.delete(`https://crudcrud.com/api/e77159fa59754ed3a1edd230fd5520a7/appointment/${obj._id}`)
            .then(res => res)
            .catch((err) => { document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>' })

        Parent.removeChild(child)
    }
    // edit
    const editbtn = document.createElement('input')
    editbtn.type = "button"
    editbtn.value = 'edit'
    editbtn.onclick = () => {
        // localStorage.removeItem(obj.email)
        Parent.removeChild(child)
        var nm = document.getElementById('nm').value = obj.name
        var mail = document.getElementById('mail').value = obj.email
        var mo = document.getElementById('mo').value = obj.Phone

        //axios PUT
        axios.put(`https://crudcrud.com/api/e77159fa59754ed3a1edd230fd5520a7/appointment/${obj._id}`, { name: nm, email: mail, Phone: mo })
            .then(res => (res))
            .catch(err => { document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>' })

        axios.delete(`https://crudcrud.com/api/e77159fa59754ed3a1edd230fd5520a7/appointment/${obj._id}`)
            .then(res => res)
            .catch((err) => { document.body.innerHTML = document.body.innerHTML + '<h4>Something Went Wrong</h4>' })
    }
    child.appendChild(editbtn)
    child.appendChild(delbtn)
    Parent.appendChild(child)
}