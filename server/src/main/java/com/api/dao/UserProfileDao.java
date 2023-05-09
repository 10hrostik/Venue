package com.api.dao;

import com.api.dto.user.UserSettingsDto;
import com.api.dto.user.builder.UserSettingsBuilder;
import com.api.entities.accounts.User;
import com.api.entities.accounts.UserSettings;
import com.config.EntityManagerConfig;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserProfileDao {

    @Autowired
    private UserDao userDao;

    private final EntityManager em;

    {
        em = EntityManagerConfig.getEntityManagerFactory();
    }

    public void save(UserSettingsDto userSettings) {
        User user = userDao.getUserByUsername(userSettings.getUsername());
        UserSettings settings = user.getUserSettings();
        if(settings != null) {
            em.detach(settings);
        } else {
            settings = new UserSettings();
            settings.setUser(user);
        }
        UserSettingsBuilder.transformToUserSettings(settings, userSettings, user);
        em.getTransaction().begin();
        em.merge(settings);
        em.getTransaction().commit();
    }
}
