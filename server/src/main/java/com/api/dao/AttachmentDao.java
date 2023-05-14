package com.api.dao;

import com.api.entities.attachments.Attachment;
import com.api.entities.events.Event;
import com.config.EntityManagerConfig;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Vector;

@Repository
@Scope("prototype")
public class AttachmentDao {

    @Autowired
    private EventDao eventDao;
    private final EntityManager em;

    {
        em = EntityManagerConfig.getEntityManagerFactory();
    }

    public synchronized List<Attachment> getAttachment(String filename) {
        try{
            Query query = em.createQuery("SELECT c FROM Attachment c WHERE c.imageURL = '" + filename + "'");

            return castList(Attachment.class, query.getResultList());
        } catch (Exception exception) {
            exception.printStackTrace();
            Attachment defaultAttachment = new Attachment();
            defaultAttachment.setType("image/png");
            defaultAttachment.setImageURL("no-photo.png");
            return List.of(defaultAttachment);
        }
    }

    public void save(Attachment attachment) {
        em.getTransaction().begin();
        em.persist(attachment);
        em.getTransaction().commit();
    }

    private <T> List<T> castList(Class<? extends T> entityClass, Collection<?> collection) {
        List<T> list = new ArrayList<T>(collection.size());
        for(Object object: collection)
            list.add(entityClass.cast(object));
        return list;
    }
}
