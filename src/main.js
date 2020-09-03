const $searchBtn = $('.search-btn')
const $searchInput = $('.search-input')
const $navList = $('.nav-list')
const $addBtn = $navList.find('li.last')
const navStr = localStorage.getItem('nav')
const navObj = JSON.parse(navStr)

// data
const hashMap = navObj || []

// utils
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}

// search
$searchBtn.on('click', () => {
    const inputValue = $searchInput.val()
    if (!inputValue.trim()) {
        return
    }
    location.href = `https://www.baidu.com/s?wd=${inputValue}`
})

// render
const render = () => {
    $navList.find('li:not(.last)').remove()
    hashMap.forEach((item, index) => {
        const $node = $(`
            <li>
                <p class="logo">${item.logo}</p>
                <p class="hostname">${simplifyUrl(item.url)}</p>
                <div class="del-wrap">
                    <svg class="icon">
                        <use xlink:href="#icondel"></use>
                    </svg>
                </div>
            </li>
        `).insertBefore($addBtn)
        $node.on('click', () => {
            window.open(item.url)
        })
        $node.on('click', '.del-wrap', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

// add
$addBtn.on('click', () => {
    let url = window.prompt('请输入您要添加的网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    render()
})

// keypress 
$(document).on('keypress', e => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})

// localStorage
window.onbeforeunload = () => {
    const dataString = JSON.stringify(hashMap)
    localStorage.setItem('nav', dataString)
}
