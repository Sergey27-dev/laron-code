<div id="order">
    <h3>Оформление заявки</h3>
    <form>
        <select name="product" id="selectProduct" class="orderInput">
            <option value="Салфетка 4*6">Салфетка 4*6</option>
            <option value="Салфетка 10*10">Салфетка 10*10</option>
            <option value="Салфетка 20*20">Салфетка 20*20</option>
            <option value="Салфетка 20*30">Салфетка 20*30</option>
            <option value="Салфетка 30*30">Салфетка 30*30</option>
            <option value="Салфетка 30*40">Салфетка 30*40</option>
            <option value="Полотенце 35*70">Полотенце 35*70</option>
            <option value="Полотенце 45*90">Полотенце 45*90</option>
        </select>
        <input type="text" id="kol" class="orderInput" placeholder="Количество">
        <input type="text" id="name" class="orderInput" placeholder="ФИО">
        <input type="text" id="tel" class="orderInput" placeholder="Номер телефона">
        <input type="text" id="email" class="orderInput" placeholder="Email">
        <div>
            <label class="check-row"><input type="checkbox" class="order-checkbox">Я согласен на обработку персональных данных</label>
            <div class="orderPolError"></div>
        </div>
        <div class="g-recaptcha" data-sitekey="6Le2qaggAAAAAC_36csNTqjs8gRqFXwTb1Q20KXy"> </div>
        <div id="recaptchaError" class="text-danger"> </div>
        <input type="button" value="Оформить заявку" id="submit-order">
    </form>
    <span id="privacy__close" class="close">ₓ</span>
</div>
<div id="overlay"></div>

