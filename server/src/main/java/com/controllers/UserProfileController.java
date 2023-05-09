package com.controllers;

import com.api.dao.UserDao;
import com.api.dao.UserProfileDao;
import com.api.dto.user.UserSettingsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/secured/userprofile")
public class UserProfileController {
    @Autowired
    private UserProfileDao userProfileDao;

    @PatchMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void saveSettings(@RequestBody UserSettingsDto userSettingsDto) {
        userProfileDao.save(userSettingsDto);
    }
}
