package controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/venue")
public class MainController {
    @GetMapping("/")
    public String loadMainMenu() {
        return "main/MainMenu";
    }

    @GetMapping("/auth")
    public String loadAuthMainMenu(@RequestParam(value = "username") String username,
            @RequestParam(value = "password") String password, Model model) {
        model.addAttribute("message", "username: " + username + " password " + password);
        return "main/Auth";
    }
}
