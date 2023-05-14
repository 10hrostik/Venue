package com.venue;

import com.api.dto.user.RegisterUserDto;
import com.api.dto.user.ResponseUserDto;
import com.api.services.ValidationService;
import com.api.services.user.UserService;
import com.config.VenueApplication;
import com.controllers.UserController;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;


@ExtendWith(SpringExtension.class)
@WebMvcTest(UserController.class)
@ContextConfiguration(classes = VenueApplication.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Mock
    private UserService userService;

    @Mock
    private ValidationService validationService;

    @MockBean
    private  UserController userController;

    private static final Logger logger;

    static {
        logger = LogManager.getLogger(UserControllerTest.class);
    }

    @Test
    public void testLogin() throws Exception {
        String username = "admin";
        String password = "admin1";
        mockMvc.perform(get("http://localhost:8080/venue/api/public/users/login/{username}/{password}", username, password)
                .contentType("application/json")).andExpect(status().isOk());
    }

    @Test
    public void testRegister() throws Exception {
        RegisterUserDto registerUserDto = new RegisterUserDto();
        registerUserDto.setUsername("testuser");
        registerUserDto.setPassword("testpassword");
        registerUserDto.setEmail("testemail@gmail.com");

        ResponseUserDto responseUserDto = new ResponseUserDto();
        responseUserDto.setUsername("testuser");

        when(userService.save(registerUserDto)).thenReturn(responseUserDto);

        mockMvc.perform(post("http://localhost:8080/venue/api/public/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerUserDto))
                        )
                .andExpect(status().isOk());

    }

    @Test
    public void testUpdate() {

    }

    @Test
    public void testDelete() {

    }

    @AfterAll
    public static void destroy() {
        logger.log(Level.INFO, "UserController test passed!");
    }
}

