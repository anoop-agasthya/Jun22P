
async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}


function takeOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            const burgers = [
                { name: 'Cheese Burger', price: 8.99 },
                { name: 'Bacon Burger', price: 9.99 },
                { name: 'Mushroom Burger', price: 10.99 }
            ];
            resolve(burgers);
        }, 2500);
    });
}


function orderPrep() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}


function payOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}


function thankyouFnc() {
    alert('Thank you for eating with us today!');
}


window.onload = async function() {
    const menuItems = await getMenu();
    const menuContainer = document.getElementById('menuItems');

    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}" class="img-fluid">
            <div class="menu-details">
                <h3>${item.name}</h3>
            </div>
            <p>$${item.price}</p>
            <button class="btn btn-primary place-order">Place Order</button>
        `;
        menuItem.querySelector('.place-order').addEventListener('click', async () => {
            try {
                const order = await takeOrder();
                console.log('Order taken:', order);
                const orderStatus = await orderPrep();
                console.log('Order status:', orderStatus);
                const paymentStatus = await payOrder();
                console.log('Payment status:', paymentStatus);
                if (paymentStatus.paid) {
                    thankyouFnc();
                }
            } catch (error) {
                console.error('Error in order process:', error);
            }
        });
        menuContainer.appendChild(menuItem);
    });
};
