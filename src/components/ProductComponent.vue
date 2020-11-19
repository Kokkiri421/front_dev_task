<template>
    <div class="product-component">
        <div class="product-photo">
            <a href="#" class="product-photo__link">
                <img v-bind:src="pictureUrl" class="product-photo__img">
            </a> 
        </div>
        <div class="product-status-code">
            <span class="product-code">Код: {{productCode}}</span>
            <span class="product-status">Наличие</span>
        </div>
        <div class="product-name">
            <a href="#" class="product-name__link">Ламинат 31 кл Kronospan Kronofix Афцелия Малайская 2,47 м.кв. 7 мм</a>
        </div>
        <div class="product-needs">
            <span class="product-needs__text">Могут понадобиться: </span>
            <span href="#" class="product-needs__item" v-for="(product,index) in assocProducts"
            :key="product">
                <a href="#" class="product-needs__item__link">{{product}}</a>
                <span v-if="index != Object.keys(assocProducts).length - 1">, </span>
            </span>
        </div>
        <div class="product-price">
            <div class="product-price__gold">
                <p class="product-price__gold__message">По карте<br>клуба</p>
                <p class="product-price__gold__price">
                    {{(isAltPrice) ? decoratePrice(product.priceGoldAlt * amount) 
                    : decoratePrice(product.priceGold * amount)}}
                    <svg width="22px" height="22px">
                        <use xlink:href="../assets//spritesheet.svg#rouble_black"></use>
                    </svg>
                </p>
            </div>
            <div class="product-price__retail">
                <p class="product-price__retail__price">
                    {{(isAltPrice) ? decoratePrice(product.priceRetailAlt * amount) 
                    : decoratePrice(product.priceRetail * amount)}}
                    <svg width="22px" height="22px">
                        <use xlink:href="../assets/spritesheet.svg#rouble_gray"></use>
                    </svg> 
                </p>
            </div>
            <div class="product-price__bonus">
                <p class="product-price__bonus__price">Можно купить за 
                    {{(isAltPrice) ? product.priceGoldAlt * amount * product.bonusAmount 
                    : product.priceGold * amount * product.bonusAmount}}
                    баллов</p>
            </div>
        </div>
        <div class="product-unit">
            <div class="product-unit__main" 
            @click="toggleAltPrice(false)"
            v-bind:class="{ active: !isAltPrice}">
                <p class="product-unit__main__text">За {{product.unit}}</p>
            </div>
            <div class="product-unit__alt" 
            @click="toggleAltPrice(true)"
            v-bind:class="{ active: isAltPrice}">
                <p class="product-unit__alt__text" v-if="product.hasAlternateUnit">За {{product.unitAlt}}</p>
            </div>
            
        </div>
        <div class="product-amount-buy">
            <div class="product-amount-buy__tooltip">
                <div class="product-amount-buy__tooltip__message">
                    <img src="..\assets\unit--i.png">
                    <p class="product-amount-buy__tooltip__message__text">Продается упаковками: 
                        <br> {{product.unitRatioAlt * amount}} {{product.unitAlt}} = {{product.unitRatio * amount}} {{product.unit}}</p>
                </div>
            </div>
            <div class="product-amount-buy__tooltip__triangle">
                <span class="outer"></span>
                <span class="inner"></span>
                
            </div>
            <div class="product-amount-buy__input">
                <div class="product-amount-buy__stepper">
                <input class="product-amount__stepper__input" type="text" 
                @keypress="isNumber($event)" v-model="amount" maxlength="2"/>
                <div class="product-amount__stepper__arrow-up"
                @click="setAmount(amount+1)"></div>
                <div class="product-amount__stepper__arrow-down"
                @click="setAmount(amount-1)"></div>
                </div>
                <button class="product-amount-buy__button" 
                    v-bind:data-product-id="product.productId">
                    <svg width="20px" height="20px">
                        <use xlink:href="..\components\spritesheet.svg#shopping_cart"></use>
                    </svg>
                    <span class="product-amount-buy__button__text">В корзину</span>
                </button>
            </div> 
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'product-component',
    data(){
        return {
            isAltPrice:false,
            amount:1,
            //Make array of assocProducts instead of string
            assocProducts: this.product.assocProducts.replaceAll('\n',' ').replace(/;+(?=;)/g,'')
            .replace(/ +(?= )/g,'').split(';').filter(Boolean).map(el => el.trim()),
            publicPath: process.env.BASE_URL,
        }
    },
    props:{
        product: {
            type: Object,
            required: true,
        },
    },  
    
    methods: {
        toggleAltPrice(value){
            this.isAltPrice = value;
        },
        decoratePrice(price){
            return price.toFixed(2).replace('.',',');
        },
        setAmount(amount){
            if (amount >= 99) {
                this.amount = 99;
            }
            else if (amount <= 0){
                this.amount = 0;
            }
            else{
                this.amount = amount;
            }
            
        },
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            }else {
                return true;
            }
        },
    
    },
    computed: {
        productCode() {
            return parseInt(this.product.code,10);
        },
        pictureUrl() {
            const [url1, url2, extention] = this.product.primaryImageUrl.split('.');
            return `${url1}.${url2}_220x220_1.${extention}`;
        },
        
    }


};
</script>

<style lang="stylus">
    black = #000
    gray = #666
    lightgray = #e0e0e0
    bold-font=700;
    .product-component
        margin:14px 0px 14px 0px;
    body
        line-height: 1.4;
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
        position: relative;
        width:1000px;
        min-width:576px;
    
    a
        text-decoration: none;
        &:hover
            text-decoration: underline;

    p
        margin: 0px;

    .product-photo
        img
            width: 160px;
            height 160px;
            align: center;

    .product-status-code
        .product-code
            font-size: 12px;
            float: left;
            color:gray;
        .product-status
            cursor: pointer;
            font-size: 14px;
            float: right;
            color: #093;
            border-bottom: 1px dotted #093;
            &:hover
                border-bottom: none;  

    .product-name
        text-align: left;
        a
            color: black;
            font-weight: bold-font;

    .product-needs
        text-align: left;
        .product-needs__text
            font-size: 13px;
            font-weight: bold-font;
        span
            font-size: 12px;
            a
                color: gray;
    
    .product-price
        .product-price__gold
        .product-price__retail
        .product-price__bonus
            display:flex;
            justify-content: flex-end;
            align-items: center;
        .product-price__gold
            line-height: 17px;
            .product-price__gold__message
                font-size:14px;
                margin-right: 26px;
            p
                text-align: right;
                width: max-content;    
            .product-price__gold__price
                font-size:25px;
                font-weight: bold-font;
        .product-price__retail
            line-height: 19px;
            color: #a7a7a7;
            font-size:25px;
            .product-price__retail__price
                width: max-content;
        .product-price__bonus
            font-size: 12px;
            line-height: 17px;
            color: #999;

    .product-unit
        cursor: default;
        display:flex;
        justify-content: flex-end;
        align-items: center;
        div
            padding: 3px 5px 3px 5px;
            max-width 0px 5px 0px 5px; 
        p
            color: #707070;
            font-size: 13px;
            border-bottom: 1px dotted #707070;
            width: max-content;
        .active
            background: black;
            p
                color: #fff;
                border-bottom: none;

    .product-amount-buy
        .product-amount-buy__tooltip
            margin: 5px 0px 5px 0px;
            padding: 5px 10px 5px 10px;
            border: 1px solid #ccc;
            .product-amount-buy__tooltip__message
                display:flex;
                img
                    margin: 8px 10px 0px 0px;
                    width:15px;
                    height:15px;
                p
                    font-size: 13px;
                    line-height: 15px;
                    text-align: left;
        .product-amount-buy__tooltip__triangle
            display: inline;
            div
                height:0px;
            .outer
                content: "";
                position: relative;
                width: 0px;
                height: 0px;
                border-width: 8px;
                border-style: solid;
                left: -80px;
                border-color: #ccc transparent transparent transparent;
            .inner
                content: "";
                position: relative;
                width: 0px;
                height: 0px;
                border-width: 7px;
                border-style: solid;
                left: -95px;
                top: -2px;
                border-color: #fff transparent transparent transparent;
        .product-amount-buy__input
            display:flex;
            height: 40px;
            margin-top: -18px;
            .product-amount-buy__stepper
                display:grid;
                grid-template-columns: 40px 27px;
                grid-template-rows: 20px 20px;
                width: max-content;
                margin-right: 6px;
                .product-amount__stepper__input
                    grid-column:1;
                    grid-row: 1/span 2;
                    border: 1px solid #ccc;
                    border-right: none;
                    color: #333;
                    font-size: 13px;
                    line-height: 1.2;
                    margin: 0;
                    text-align:center;
                    &:focus
                        outline: none;
                .product-amount__stepper__arrow-up
                    grid-column:2;
                    grid-row: 1;
                    background: #fff url('../assets/count--i.png') no-repeat;
                    background-position: -27px 0px;
                    border: 1px solid #ccc;
                    cursor: pointer;
                    &:hover
                        background-position: 0px 0px;
                        background-color: black;   
                .product-amount__stepper__arrow-down
                    grid-column:2;
                    grid-row: 2;
                    background: #fff url('../assets/count--i.png') no-repeat;
                    background-position: -27px -20px;
                    border: 1px solid #ccc;
                    border-top: none;
                    cursor: pointer;
                    &:hover
                        background-position: 0px -20px; 
                        background-color: black;
            .product-amount-buy__button
                padding: 0px;
                display: flex;
                width: 100%;
                background-color: #f90;
                text-transform: uppercase;
                text-align: center;
                border: none;
                font: 14px/40px Arial, Helvetica, sans-serif;
                text-decoration: none;
                color: #fff;
                justify-content: flex-start;
                align-items: center;
                svg
                    margin-left: 10px;
                    margin-right: 15px;
                    fill: #fff;
                &:hover
                    background-color: black;
                &:focus
                    outline: none;

                
            
                  
    .product-component
        padding: 12px;
        border: 1px solid lightgray;
        display: grid;

        @media screen and (min-width: 1249px)
            grid-template-columns: 220px 1fr 220px;
            grid-template-rows: 32px 38px 25px 27px 32px 54px 90px;
            column-gap: 20px;
            width: 1000px;
            .product-photo
                grid-column:1;
                grid-row: 1/span 6;
            .product-status-code
                grid-column: 2/span 2;
                grid-row: 1;
            .product-name
                font-size: 16px;
                line-height: 24px;
                grid-column: 2;
                grid-row: 2;
            .product-needs
                grid-column: 2;
                grid-row: 4/span 2;
            .product-price
                grid-column: 3;
                grid-row: 2/span 3;
                display:grid;
                grid-template-rows: 38px 27px 32px;
            .product-unit
                grid-column: 3;
                grid-row:5; 
            .product-amount-buy
                grid-column: 3;
                grid-row:6/span 2;

        @media screen and (max-width: 1249px) and (min-width: 1000px)
            width: 750px;
            grid-template-columns: 160px 1fr 220px;
            grid-template-rows: 25px 32px 32px 29px 55px 80px;
            column-gap: 12px;
            .product-photo
                grid-column:1;
                grid-row: 1/span 5;
            .product-status-code
                grid-column: 2;
                grid-row: 1;
            .product-name
                margin-top: 10px;
                font-size: 14px;
                line-height: 24px;
                grid-column: 2;
                grid-row: 2/span 2;          
            .product-needs
                margin-top: 10px;
                grid-column: 2;
                grid-row: 4/span 2;
            .product-price
                grid-column: 3;
                grid-row: 1/span 3;
                display:grid;
                grid-template-rows: 35px 34px 15px;
                .product-price__retail
                    align-items: flex-start;
            .product-unit
                grid-column: 3;
                grid-row:4; 
            .product-amount-buy
                grid-column: 3;
                grid-row:5/span 2;
        @media screen and (max-width: 999px)
            width: 240px;
            grid-template-rows: 25px 228px 85px 69px 25px 90px;
            row-gap: 6px;
            .product-photo
                grid-row: 2;
            .product-status-code
                grid-row: 1;
            .product-name
                font-size: 14px;
                line-height: 24px;
                grid-row: 3;    
            .product-needs
            .product-amount-buy__tooltip
            .product-amount-buy__tooltip__triangle
                display:none;
            .product-price__bonus
                visibility:hidden;
            .product-price
                .product-price__gold__message
                    margin-right: 10px;
                grid-row: 4;
                display:grid;
                grid-template-rows: 32px 27px 10px;
                .product-price__retail
                    align-items: flex-start;
            .product-unit
                grid-row:5; 
            .product-amount-buy
                .product-amount-buy__input
                    margin-top: 0px;
                grid-row:6;
</style>
