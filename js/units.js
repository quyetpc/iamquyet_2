
var currentPicked = ''
var currentPrice = ''
var currentImgSrc = ''
var isSented = false

function copyText(text) {

    setModal('Đã copy vào bộ nhớ tạm!')
    // Create a fake `textarea` and set the contents to the text
    // you want to copy
    const storage = document.createElement('textarea');
    storage.value = text;
    const element = document.body;
    element.appendChild(storage);

    // Copy the text in the fake `textarea` and remove the `textarea`
    storage.select();
    storage.setSelectionRange(0, 99999);
    document.execCommand('copy');
    element.removeChild(storage);

}

function pickProduct(idProduct) {
    currentPicked = idProduct
    let product = document.getElementById(currentPicked)
    currentPrice = product.getElementsByClassName('product-card-price')[0].innerText
    currentImgSrc = product.getElementsByTagName('img')[0].src

    let currentProduct = document.getElementById('current-product')
    currentProduct.getElementsByTagName('img')[0].src = currentImgSrc
    document.getElementById('current-id').innerHTML = `MÃ ĐANG CHỌN: <span style="color: red;">${currentPicked}</span>`
    document.getElementById('final-price').innerText = currentPrice
    console.log(`Picked ${currentPicked}`)
    // console.log(currentImgSrc);
}

function setModal(text) {
    var modalBox = document.getElementById('copyModal')
    modalBox.getElementsByTagName('h3')[0].innerHTML = text
}

function sendRequest() {



    if (!isSented) {
        var linkContact = document.getElementsByClassName('logo-contact-input')[0].value
        var nameWebsite = document.getElementById('logo-name-input').value

        if (currentPicked != '') {
            if (nameWebsite != '') {
                if (linkContact != '') {
                    if (nameWebsite != '') {
                        setModal('Yêu cầu đã được gửi!')
        
                        const url = `${document.location.origin.split('?')[0]}/sendRequest.php`
        
                        postData(url, JSON.stringify({
                            linkContact,
                            nameWebsite,
                            currentPicked,
                            currentPrice
                        }))
                            .then((data) => {
                                isSented = true
                            });    
                    } else {
                        setModal('Không được để trống phần thông tin liên hệ hoặc tên miền website cần làm logo\nVui lòng điền đủ tên miền (vd: iamhoang.vn); link liên hệ Facebook, zalo, telegram...');
                    }
                } else {
                    setModal('Không được để trống phần thông tin liên hệ hoặc tên miền website cần làm logo\nVui lòng điền đủ tên miền (vd: iamhoang.vn); link liên hệ Facebook, zalo, telegram...');
                    // alert('Bạn chưa chọn logo cần làm!');
                }
            } else {
                setModal('Bạn điền tên miền website cần làm!')
            }
        } else {
            setModal('Bạn chưa chọn logo cần làm!')

            // alert('Không được để trống phần thông tin liên hệ hoặc tên miền website cần làm logo\nVui lòng điền đủ tên miền (vd: hoangmomo.vn); link liên hệ Facebook, zalo, telegram...')
        }
    } else {
        setModal('Bạn đã gửi 1 yêu cầu trước đó rồi! Tải lại trang để làm mới!')
    }

}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.text(); // parses JSON response into native JavaScript objects
}



