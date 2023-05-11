export default function switchCriteria(mode, settingsVisibility, setSettingsVisibility) {

    const handleNext = () => {
        for(let property in settingsVisibility) {
            if(settingsVisibility[property] == 'visible' && property == 'festival') {
                setSettingsVisibility({
                    festival: 'hidden',
                    theatre: 'visible',
                    workshop: 'hidden',
                    concert: 'hidden'
                })
                break;
            } else if (settingsVisibility[property] == 'visible' && property == 'theatre') {
                setSettingsVisibility({
                    festival: 'hidden',
                    theatre: 'hidden',
                    workshop: 'visible',
                    concert: 'hidden'
                })
                break;
            } else if (settingsVisibility[property] == 'visible' && property == 'workshop') {
                setSettingsVisibility({
                    festival: 'hidden',
                    theatre: 'hidden',
                    workshop: 'hidden',
                    concert: 'visible'
                })
                break;
            } else {
                setSettingsVisibility({
                    festival: 'visible',
                    theatre: 'hidden',
                    workshop: 'hidden',
                    concert: 'hidden'
                })
            }
        }
    }

    const handlePrev = () => {
        for(let property in settingsVisibility) {
            if(settingsVisibility[property] == 'visible' && property == 'festival') {
                setSettingsVisibility({
                    festival: 'hidden',
                    theatre: 'hidden',
                    workshop: 'hidden',
                    concert: 'visible'
                })
                break;
            } else if (settingsVisibility[property] == 'visible' && property == 'theatre') {
                setSettingsVisibility({
                    festival: 'visible',
                    theatre: 'hidden',
                    workshop: 'hidden',
                    concert: 'hidden'
                })
                break;
            } else if (settingsVisibility[property] == 'visible' && property == 'workshop') {
                setSettingsVisibility({
                    festival: 'hidden',
                    theatre: 'visible',
                    workshop: 'hidden',
                    concert: 'hidden'
                })
                break;
            } else {
                setSettingsVisibility({
                    festival: 'hidden',
                    theatre: 'hidden',
                    workshop: 'visible',
                    concert: 'hidden'
                })
            }
        }
    }

    if(mode == 'next') {
        handleNext();
    } else {
        handlePrev();
    }
}