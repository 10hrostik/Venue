package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import api.beans.accounts.User;
import api.dao.UserDao;

@RestController
@RequestMapping("/")
public class MainController {
    @Autowired
    private UserDao userDao;

    @PostMapping()
    public String register(@ModelAttribute("user") User user) {
        System.out.println("here");
        userDao.save(user);
        return "redirect:/";
    }
}
