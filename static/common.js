
(function () {
  const card = document.querySelector('#card')

  if (!card) return

  card.addEventListener('click', function (e) {
    let target = e.target;
    if (target.classList.contains('btnRemove')) {
      let id = target.getAttribute('data-id')

      fetch('wishlist/remove/' + id, { method: 'DELETE' })
        .then(res => {
          console.log('responce #1 ', res)
          return res.json();
        })
        .then(data => {
          console.log('responce (data) #2 ', data)

          if (data.list && data.list.length) {
            const html = data.list.map(item => {
              return `
              <tr>
                <td>${item.title}</td>
                <td><img class="thumbnail" src="${item.img}"></td>
                <td>${item.count}</td>
                <td><button class="brn btn-small btnRemove" data-id="${item.id}">delete</button></td>
               </tr>
              `
            });
            card.querySelector('tbody').innerHTML = html
          } else {
            card.innerHTML = '<p>Wishlist is empty</p>'
          }
        })

    }
  })



})()
