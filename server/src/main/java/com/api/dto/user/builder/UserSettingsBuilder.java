package com.api.dto.user.builder;

import com.api.dto.user.UserSettingsDto;
import com.api.entities.accounts.User;
import com.api.entities.accounts.UserSettings;

public interface UserSettingsBuilder {

    static void transformToUserSettings(UserSettings model, UserSettingsDto dto, User user) {
        model.setConcertSettings(dto.getConcert());
        model.setTheatreSettings(dto.getTheatre());
        model.setWorkshopSettings(dto.getWorkshop());
        model.setFestivalSettings(dto.getFestival());
    }
}
