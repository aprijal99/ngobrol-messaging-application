package ngobrol;

import ngobrol.entity.*;
import ngobrol.service.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.sql.Timestamp;
import java.util.Random;

@SpringBootApplication
public class NgobrolWebSocketApplication {
	public static void main(String[] args) {
		SpringApplication.run(NgobrolWebSocketApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(UserService userService,
									ContactService contactService,
									MessageService messageService,
									GroupChatService groupChatService,
									UserGroupService userGroupService,
									GroupMessageService groupMessageService) {
		return args -> {
			User ghiyas = new User("Aprijal Ghiyas Setiawan", "aprijalghiyas@gmail.com", "subang12345", "USER", "Available", null, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()));
			User ainun = new User("Ainun Nisa", "ainunnisa@gmail.com", "bandung2002", "USER", "Available", null, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()));
			User deki = new User("Deki Geraldi", "dekigeraldi@gmail.com", "ciater12345", "USER", "Available", null, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()));
			User irsyad = new User("Irsyad Ibadurrahman", "irsyadibadurrahman@gmail.com", "bekasi12345", "USER", "Available", null, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()));

			userService.saveUser(ghiyas);
			userService.saveUser(ainun);
			userService.saveUser(deki);
			userService.saveUser(irsyad);

			contactService.saveContact(new Contact(ghiyas, ainun));
			contactService.saveContact(new Contact(ghiyas, deki));
			contactService.saveContact(new Contact(ghiyas, irsyad));
			contactService.saveContact(new Contact(ainun, ghiyas));
			contactService.saveContact(new Contact(deki, ghiyas));
			contactService.saveContact(new Contact(irsyad, ghiyas));

			Random r = new Random();

			messageService.saveMessage(new Message(null, "Hi Ainun", null, new Timestamp(System.currentTimeMillis()), ghiyas, ainun));
			messageService.saveMessage(new Message(null, "How are you today?", null, new Timestamp(System.currentTimeMillis()), ghiyas, ainun));
			messageService.saveMessage(new Message(null, "Hi Deki", null, new Timestamp(System.currentTimeMillis()), ghiyas, deki));
			messageService.saveMessage(new Message(null, "How are you today?", null, new Timestamp(System.currentTimeMillis()), ghiyas, deki));
			messageService.saveMessage(new Message(null, "Hi Irsyad", null, new Timestamp(System.currentTimeMillis()), ghiyas, irsyad));
			messageService.saveMessage(new Message(null, "How are you today?", null, new Timestamp(System.currentTimeMillis() + (r.nextInt(1000 - 100) + 100)), ghiyas, irsyad));
			messageService.saveMessage(new Message(null, "Hi Ghiyas", null, new Timestamp(System.currentTimeMillis()), ainun, ghiyas));
			messageService.saveMessage(new Message(null, "I'm good, how about you?", null, new Timestamp(System.currentTimeMillis()), ainun, ghiyas));
			messageService.saveMessage(new Message(null, "Hi Ghiyas", null, new Timestamp(System.currentTimeMillis()), deki, ghiyas));
			messageService.saveMessage(new Message(null, "I'm cold bro since this morning, I need a bed rest", null, new Timestamp(System.currentTimeMillis() + (r.nextInt(1000 - 100) + 100)), deki, ghiyas));
			messageService.saveMessage(new Message(null, "Good, I heard Deki was sick this morning", null, new Timestamp(System.currentTimeMillis() + (r.nextInt(1000 - 100) + 100)), ghiyas, ainun));

			GroupChat biochemistry = new GroupChat("Biochemistry 5", "Group 5 in Biochemistry class", null, new Timestamp(System.currentTimeMillis()));
			GroupChat boys = new GroupChat("Boys", "Group of boys of Biochemistry 2018", null, new Timestamp(System.currentTimeMillis()));

			groupChatService.saveGroupChat(biochemistry);
			groupChatService.saveGroupChat(boys);

			userGroupService.saveUserGroup(new UserGroup(ghiyas, biochemistry));
			userGroupService.saveUserGroup(new UserGroup(ainun, biochemistry));
			userGroupService.saveUserGroup(new UserGroup(deki, biochemistry));
			userGroupService.saveUserGroup(new UserGroup(ghiyas, boys));
			userGroupService.saveUserGroup(new UserGroup(deki, boys));
			userGroupService.saveUserGroup(new UserGroup(irsyad, boys));

			groupMessageService.saveGroupMessage(new GroupMessage("Morning guys", null, new Timestamp(System.currentTimeMillis()), ainun, biochemistry));
			groupMessageService.saveGroupMessage(new GroupMessage("Today we have a meeting in library right?", null, new Timestamp(System.currentTimeMillis()), ainun, biochemistry));
			groupMessageService.saveGroupMessage(new GroupMessage("O yeah, I almost forget", null, new Timestamp(System.currentTimeMillis()), ghiyas, biochemistry));
			groupMessageService.saveGroupMessage(new GroupMessage("Where the plan we meet?", null, new Timestamp(System.currentTimeMillis() + (r.nextInt(1000 - 100) + 100)), deki, biochemistry));

			groupMessageService.saveGroupMessage(new GroupMessage("Guys how about we go to restaurant for lunch today?", null, new Timestamp(System.currentTimeMillis()), irsyad, boys));
			groupMessageService.saveGroupMessage(new GroupMessage("I'm sorry Irsyad, Me and Ghiyas must go for doing task", null, new Timestamp(System.currentTimeMillis()), deki, boys));
			groupMessageService.saveGroupMessage(new GroupMessage("It maybe done until evening", null, new Timestamp(System.currentTimeMillis()), deki, boys));
			groupMessageService.saveGroupMessage(new GroupMessage("Yeah I'm really sorry", null, new Timestamp(System.currentTimeMillis()), ghiyas, boys));
			groupMessageService.saveGroupMessage(new GroupMessage("How about tomorrow?", null, new Timestamp(System.currentTimeMillis()), ghiyas, boys));
			groupMessageService.saveGroupMessage(new GroupMessage("Ahh, ok I think I have to go with Riyan", null, new Timestamp(System.currentTimeMillis() + (r.nextInt(1000 - 100) + 100)), irsyad, boys));
		};
	}
}
