package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import api.beans.User;
import api.dao.UserDao;

@Controller
@RequestMapping("/")
public class MainController {
    @Autowired
    private UserDao userDao;

    @GetMapping()
    public String loadMainMenu(@ModelAttribute("user") User user) {
        return "main/mainpage";
    }

    @GetMapping("auth")
    public String loadAuthMainMenu(@RequestParam(value = "username") String username,
            @RequestParam(value = "password") String password, Model model) {

        User user = userDao.getUser(username, password);
        if (user != null) {
            model.addAttribute("message", "username: " + user.getUsername() + " password " + user.getPassword());
        } else {
            model.addAttribute("message", "Wrong username or password");
        }
        return "main/authedpage";
    }

    @PostMapping()
    public String register(@ModelAttribute("user") User user) {
        userDao.save(user);
        return "redirect:/";
    }
}
