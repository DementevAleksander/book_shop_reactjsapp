import React from 'react';
import { connect } from 'react-redux';
import {deleteFromCart, orderCompleted} from '../../actions';
import WithRestoService from '../hoc';

import './cart-table.scss';


const CartTable = ({items, deleteFromCart, RestoService, orderCompleted, orderCompletedButton}) => {
    if( items.length === 0){
        return (<div className="cart__title"> Ваша корзина пуста :( </div>)
    }
    
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
            {
                items.map( item => {
                    const {price, title, url, id, qtty} = item;
                    return (
                        <div key = {id} className="cart__item">
                            <img src={url} className="cart__item-img" alt={title}></img>
                            <div className="cart__item-title">{title}</div>
                            <div className="cart__item-price">{price}$ * {qtty}</div>
                            <div onClick = {() => deleteFromCart(id)}className="cart__close">&times;</div>
                        </div>
                    );
                })
            }
            </div>

            {orderCompletedButton === false ?
            (
                <form className = "form_wrapper">

                    <span>Введите ваш e-mail:</span>
                    <input type="email" placeholder="Ваш e-mail для подтверждения заказа..." label="Введите email" required />

                    <button onClick = {() => {
                                                RestoService.setOrder( generateOrder(items))
                                                orderCompleted()
                                            } } className = "order">Оформить заказ</button>
                </form>
            ) :
            <div className="cart__item-finish_order">Ваш заказ сформирован и отправлен менеджеру для сбора! Мы свяжемся с вами в ближайшее время для подтверждения заказа. Если вам не ответили в течение одного часа, напишите нам, пожалуйста, на почту mirbestbooks@booksbest.ru. Для формирования нового заказа обновите страницу.</div>}
        </>
    );
};

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            qtty: item.qtty
        }
    })
    return newOrder;
}

const mapStateToProps = (state) => {
    return{
        items: state.items,
        orderCompletedButton: state.orderCompleted
    }
};

const mapDispatchToProps = {
    deleteFromCart,
    orderCompleted
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));