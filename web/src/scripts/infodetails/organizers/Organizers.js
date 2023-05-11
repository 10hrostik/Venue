import React from "react";
import fullHeight from "../../utils/BlockHeights";

export default function Organizers(props) {
    let visible = props.visibility;
    let handleClose = () => {
        props.callback()
    }
    let screenHeight = fullHeight.bodyHeight + fullHeight.footerHeight + fullHeight.headerHeight;
    return (
        <div className="popUp" style={{position: "absolute", width: "100%", 
                    height: screenHeight, visibility: visible, zIndex: 200}}>
            <div className="TicketsPopUp" style={{ 
                height: 615, width: 800, overflow: "auto", whiteSpace: "pre-wrap",bottom: fullHeight.footerHeight - 5, right: 220}}>
                    <button className="servicePopUpClose" onClick={handleClose}>X</button>
                    <div className="aboutUsText">
                        <h1>Організаторам</h1>
                        <p> Ми поділяємо вашу пристрасть до музики, видовищних подій та якісних шоу. За роки роботи ми засвоїли чимало уроків, вчилися на власних помилках і провели безліч масштабних подій. Ми знаємо, як створюються успішні заходи і з радістю ділимося накопиченим досвідом із партнерами.
                        </p>
                        <p> Ми допомагаємо Організаторам подій будь-якого масштабу: від невеликих (на кілька десятків осіб), до стадіонних концертів і фестивалів на десятки тисяч глядачів. Для кожного ми стаємо уважними, чуйними і розуміючими. Або просто надійними партнерами, якщо ви не дуже любите дружити 🙂
                        </p>
                        <p> <strong>Concert.ua - це один з кращих квиткових сервісів, це якісний IT- та маркетинг-супровід подій і команда професіоналів, які змушують все це злагоджено працювати.</strong>
                        </p>
                        <p> Ми пропонуємо:<br></br>
                        </p>
                        <ul>
                            <li> Ефективну платформу для автоматизації управління продажами</li>
                            <li> Аналіз онлайн-статистики та звітів</li>
                            <li> Консалтинг ціноутворення та маркетинг-стратегії</li>
                            <li> Складання плану продажів і побудову прогнозів</li>
                        </ul>
                        <p> Забезпечуємо продажі квитків на ваш захід онлайн, доставкою кур'єром в будь-який населений пункт України і організовуємо реалізацію через розгалужену гілку квиткових офісів.
                        </p>
                    </div>           
            </div>
        </div>
    )
}