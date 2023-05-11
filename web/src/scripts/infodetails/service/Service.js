import React from "react";
import fullHeight from "../../utils/BlockHeights";

export default function Service(props) {
    let visible = props.visibility;
    let handleClose = () => {
        props.callback()
    }
    let screenHeight = fullHeight.bodyHeight + fullHeight.footerHeight + fullHeight.headerHeight;
    return (
        <div className="popUp" style={{position: "absolute", width: "100%", 
                    height: screenHeight, visibility: visible, zIndex: 200}}>
            <div className="TicketsPopUp" style={{ 
                height: 615, width: 800, overflow: "auto", whiteSpace: "pre-wrap",bottom: fullHeight.footerHeight - 5, marginLeft: "21%"}}>
                    <button className="servicePopUpClose" onClick={handleClose}>X</button>
                    <div className="aboutUsText">
                        <h1>ТИ МАЙЖЕ ТАМ</h1>
                        <p> Ми створили venue.ua, щоб ділитися емоціями не тільки під час подій, а й поза ними. Аби ви не пропустили жодного концерту від улюблених зірок, змогли потрапити на важливу театральну прем’єру й встигнули купити квитки на найкращу новорічну виставу для дітей. Щоб артисти відкривали себе глядачам, а організатори — створювали заходи, про які казатимуть «хочемо ще».
                        </p>
                        <h3>Коли це квитки на Venue.ua — ти починаєш жити подією вже під час купування, бо тут знають, як зробити, щоб ти сконцентрувався тільки на приємному.</h3>
                        <p> <br></br>Будь-яка подія — це не просто спосіб побачити артиста чи довгоочікувану виставу, заспівати улюблену пісню чи зустрітися з друзями. Це емоції, що надихають за півроку до та заряджають на багато днів після. Це привід посміхнутися в нескінченному заторі, тому що з динаміків лунає той самий хіт, або вдягнутися, як Леді Ґаґа, бо чому б ні. Разом із квитками на ваші улюблені події concert.ua дарує радісне передчуття, що супроводжує із самого моменту замовлення. Тому ми не просто зручна квиткова каса, ми — постачальники гарного настрою.
                        </p>
                        <p><strong>Історія Venue.Ua почалась із бажання створювати музику та привозити в Україну зірок світового масштабу. Тому одне з перших успішних сучасних медіа країни, присвячених електронній музиці, як і перші найгучніші виступи головних диджеїв планети в Україні — теж наша робота.
                        </strong>
                        </p> <br></br>
                        Це означає, що ми насправді розуміємося на тому, як створити настрій, а не просто «зробити касу». І, зрештою, так набагато цікавіше! Ми постійно розвиваємося, щоб допомагати відшукати подію до вподоби музичним фанатам, поціновувачам театру та опери, новорічних ялинок і гастрофестів. І в кожному випадку намагаємося зробити цей досвід справді приємним — починаючи з першого візиту на сайт або до квиткового офісу. Адже події швидко минають, а хвилююче передчуття свята та приємні спогади залишаються назавжди. Тому наша мета — примножувати ці миті щастя й ділитися ними з вами.
                    </div>           
            </div>
        </div>
    )
}