// package user;

// import static org.junit.Assert.assertNotNull;

// import javax.persistence.EntityManager;
// import org.junit.Before;
// import org.junit.Test;

// import api.configs.EntityManagerConfig;
// import api.dao.UserDao;
// import api.dto.user.RegisterUserDto;
// import api.dto.user.UserDto;
// import api.entities.accounts.User;

// public class UserTest {
//     private EntityManager em;
//     private UserDao userDao;
    
//     @Before
//     void emInit(){
//         em = EntityManagerConfig.getEntityManagerFactory();
//         userDao = new UserDao();
//     }
     
//     @Test
//     public void testAdd(){
//         RegisterUserDto newUser = new RegisterUserDto();
//         newUser.setUserName("Vika1234");
//         newUser.setPassword("vika1234");
//         newUser.setEmail("vika1234@gmail.com");
//         userDao.save(newUser);
//         User user = em.find(User.class, newUser.getUserName());
//         assertNotNull(user);
//     }
    
// }
