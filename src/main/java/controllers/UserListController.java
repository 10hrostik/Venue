package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import api.dao.UserDao;

@Component
@RequestMapping("/venue")
public class UserListController {
    @Autowired
    private UserDao userDao;

    @GetMapping("/users")
    public String getAllUsers(Model model) {
        model.addAttribute("users", userDao.getUsers());
        return "users/userlist";
    }

    @GetMapping("/users/{id}")
    public String getUser(@PathVariable("id") long id, Model model) {
        model.addAttribute("user", userDao.getUserById(id));
        return "userinfo";
    }
}
