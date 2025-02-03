package com.example.ExpenseManagementApp.Repositories;

import com.example.ExpenseManagementApp.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

//    @Query(value = "SELECT * FROM category WHERE scope_id = :scopeId", nativeQuery = true)
//    List<Category> findCategoriesByScopeId(@Param("scopeId") Long scopeId);


    Optional<Category> findByName(String name);

    @Query("SELECT c FROM Category c WHERE c.name = ?1 AND c.parent.id = ?2")
    Optional<Category> findByParent(String name, Long parentCategoryId);

    List<Category> findByType(Category.CatType type);

//    @Query("SELECT c FROM Category c WHERE c.name = ?1")
//    Optional<Category> findParentByName(String name);
}
